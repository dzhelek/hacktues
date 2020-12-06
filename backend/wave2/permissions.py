from datetime import date

from rest_framework import permissions

from wave2.models import FieldValidationDate


def is_admin_or_safe(request):
    return (
        request.user.is_superuser or
        request.method in permissions.SAFE_METHODS
    )


class UserPermissions(permissions.BasePermission):
    """
    allowed methods:

    unregistered user - get, post
    registered user - get, put*, delete*
    """
    def has_permission(self, request, view):
        if not request.data.get('username'):
            return True

        if request.method == 'POST':
            return request.user.is_staff  # only special users / unregistered

        return True

    def has_object_permission(self, request, view, obj):
        if view.action == 'leave_team' and team_not_editable():
            return False

        if is_admin_or_safe(request) or request.user == obj:
            return True

        return False


class TeamPermissions(permissions.BasePermission):
    """
    allowed methods:

    user: - get
    registered user: - ..., post
    captain: - ..., put*, delete*
    """
    def has_permission(self, request, view):
        if request.method == 'DELETE' and team_not_editable():
            return False

        if is_admin_or_safe(request):
            return True

        if request.method == 'POST':
            return not request.user.is_staff  # only real users

        return True

    def has_object_permission(self, request, view, obj):
        if view.action == 'change_captain' and team_not_editable():
            return False

        is_team_captain = (
            request.user.is_captain and request.user.team_set.first() == obj
        )
        if is_admin_or_safe(request) or is_team_captain:
            return True

        return False

def team_not_editable():
    return (
        FieldValidationDate.objects.get(field='team_editable').date <
        date.today()
    )
