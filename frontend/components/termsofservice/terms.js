import { Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import Markdown from 'markdown-to-jsx';
import txt from 'raw-loader!./terms.md';
var parts = txt.split(";;");

const panels = [
    { title: <Markdown>### Политика за поверителност на Hack TUES 6</Markdown>, description: <Markdown>{parts[0]}</Markdown>},
    { title: <Markdown>### Какви лични данни събираме и за какви цели?</Markdown>, description: <Markdown>{parts[1]}</Markdown>},
    { title: <Markdown>### С кого и как можем да споделим ваши лични данни?</Markdown>, description: <Markdown>{parts[2]}</Markdown>},
    { title: <Markdown>### Колко дълго ги пазим?</Markdown>, description: <Markdown>{parts[3]}</Markdown>},
    { title: <Markdown>### Данни на непълнолетни участници в Hack TUES 6</Markdown>, description: <Markdown>{parts[4]}</Markdown>},
    { title: <Markdown>### Данни на непълнолетни участници в Hack TUES 6</Markdown>, description: <Markdown>{parts[5]}</Markdown>},
    { title: <Markdown>### Контакт с нас</Markdown>, description: <Markdown>{parts[6]}</Markdown>},
]

export default function Terms() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Text as="u" onClick={onOpen}>Terms of Service</Text>
  
        <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontFamily="Rubik">Политика за поверителност на Hack TUES 6</ModalHeader>
            <ModalBody fontFamily="Rubik">
                <Markdown>### Политика за поверителност на Hack TUES 6</Markdown>
                <Markdown>{parts[0]}</Markdown>
                <Markdown>### Какви лични данни събираме и за какви цели?</Markdown>
                <Markdown>{parts[1]}</Markdown>
                <Markdown>### С кого и как можем да споделим ваши лични данни?</Markdown>
                <Markdown>{parts[2]}</Markdown>
                <Markdown>### Колко дълго ги пазим?</Markdown>
                <Markdown>{parts[3]}</Markdown>
                <Markdown>### Данни на непълнолетни участници в Hack TUES 6</Markdown>
                <Markdown>{parts[4]}</Markdown>
                <Markdown>### Политика за поверителност на Hack TUES 6</Markdown>
                <Markdown>{parts[5]}</Markdown>
                <Markdown>### Контакт с нас</Markdown>
                <Markdown>{parts[6]}</Markdown>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }