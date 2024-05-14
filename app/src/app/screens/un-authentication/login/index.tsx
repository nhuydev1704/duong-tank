import React, { useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  ViewProps,
} from 'react-native';

import {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { UnistylesRuntime } from 'react-native-unistyles';

import { Screen } from '@components/screen';
import {
  ActionsheetBackdrop,
  ActionsheetDragIndicatorWrapper,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Center,
  ChevronDownIcon,
  CloseIcon,
  FormControlLabel,
  GlobeIcon,
  Heading,
  HStack,
  Icon,
  InputField,
  InputIcon,
  Menu,
  MenuItem,
  MenuItemLabel,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Spinner,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import { AnimatedView, View } from '@rn-core';
import {
  Canvas,
  Circle,
  Image,
  ImageShader,
  makeImageFromView,
  SkImage,
} from '@shopify/react-native-skia';
import { createStyleSheet, useStyles } from '@theme';
import { Actionsheet } from '@gluestack-ui/themed';
import { ActionsheetContent } from '@gluestack-ui/themed';
import { ActionsheetDragIndicator } from '@gluestack-ui/themed';
import { ActionsheetItem } from '@gluestack-ui/themed';
import { ActionsheetItemText } from '@gluestack-ui/themed';
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { FormControl } from '@gluestack-ui/themed';
import { FormControlLabelText } from '@gluestack-ui/themed';
import { Input } from '@gluestack-ui/themed';
import { InputSlot } from '@gluestack-ui/themed';

const wait = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

export const Login = () => {
  // state
  const toast = useToast();

  const [showActionsheet, setShowActionsheet] = React.useState(false);

  const handleClose = () => setShowActionsheet(!showActionsheet);

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);

  const ref = React.useRef(null);

  const { height } = useWindowDimensions();

  const r = useSharedValue(0);

  const opacity = useSharedValue(0);

  const image1 = useSharedValue<SkImage | null>(null);

  const image2 = useSharedValue<SkImage | null>(null);

  const rootRef = useRef<View>(null);

  const { styles, theme } = useStyles(styleSheet);

  // func
  const updateStatusBar = (prevType: string) => {
    StatusBar.setBarStyle(
      prevType !== 'dark' ? 'light-content' : 'dark-content',
    );
  };

  const handleChangeTheme = async () => {
    opacity.value = 1;

    const overlay1 = await makeImageFromView(rootRef);

    image1.value = overlay1;

    await wait(100);

    UnistylesRuntime.setTheme(
      UnistylesRuntime.themeName !== 'dark' ? 'dark' : 'light',
    );

    await wait(200);

    const overlay2 = await makeImageFromView(rootRef);

    image2.value = overlay2;

    await wait(200);

    r.value = withTiming(height * 1.5, { duration: 1000 }, f => {
      if (f) {
        runOnJS(updateStatusBar)(theme.type);

        opacity.value = 0;

        r.value = 0;

        image2.value = null;

        image1.value = null;
      }
    });
  };

  // props
  const canvasProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: opacity.value === 1 ? 'auto' : 'none',
  }));

  const canvasStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const size = useSharedValue({ width: 0, height: 0 });

  const widthCanvas = useDerivedValue(() => size.value.width);

  const heightCanvas = useDerivedValue(() => size.value.height);

  const circleC = useDerivedValue(() => ({
    x: widthCanvas.value / 2,
    y: heightCanvas.value,
  }));

  // render
  return (
    <>
      <View ref={rootRef} style={styles.root}>
        <Screen
          bottomInsetColor="transparent"
          scroll
          excludeEdges={['bottom']}
          statusBarStyle="dark-content"
          style={{ paddingVertical: 0, paddingHorizontal: 10 }}
          backgroundColor={'transparent'}>
          <Button onPressIn={handleChangeTheme}>
            <ButtonText>Hello World</ButtonText>
          </Button>

          <Spinner size="small" />

          <Button
            onPress={() => {
              toast.show({
                placement: 'top',
                render: ({ id }) => {
                  const toastId = 'toast-' + id;

                  return (
                    <Toast nativeID={toastId} action="warning" variant="accent">
                      <VStack space="xs">
                        <ToastTitle>New Message</ToastTitle>
                        <ToastDescription>
                          Hey, just wanted to touch base and see how you're
                          doing. Let's catch up soon!
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  );
                },
              });
            }}>
            <ButtonText>Press Me</ButtonText>
          </Button>
          <Select>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select option" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="UX Research" value="ux" />
                <SelectItem label="Web Development" value="web" />
                <SelectItem
                  label="Cross Platform Development Process"
                  value="cross-platform"
                />
                <SelectItem label="UI Designing" value="ui" isDisabled={true} />
                <SelectItem label="Backend Development" value="backend" />
              </SelectContent>
            </SelectPortal>
          </Select>

          <Center h={300}>
            <Button onPress={() => setShowAlertDialog(true)}>
              <ButtonText>Click me</ButtonText>
            </Button>
            <AlertDialog
              isOpen={showAlertDialog}
              onClose={() => {
                setShowAlertDialog(false);
              }}>
              <AlertDialogBackdrop />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <Heading size="lg">Deactivate account</Heading>
                  <AlertDialogCloseButton>
                    <Icon as={CloseIcon} />
                  </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                  <Text size="sm">
                    Are you sure you want to deactivate your account? Your data
                    will be permanently removed and cannot be undone.
                  </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <ButtonGroup space="lg">
                    <Button
                      variant="outline"
                      action="secondary"
                      onPress={() => {
                        setShowAlertDialog(false);
                      }}>
                      <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                      bg="$error600"
                      action="negative"
                      onPress={() => {
                        setShowAlertDialog(false);
                      }}>
                      <ButtonText>Deactivate</ButtonText>
                    </Button>
                  </ButtonGroup>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Center>

          <Menu
            placement="top"
            trigger={({ ...triggerProps }) => {
              return (
                <Button {...triggerProps}>
                  <ButtonText>Menu</ButtonText>
                </Button>
              );
            }}>
            <MenuItem key="Community" textValue="Community">
              <Icon as={GlobeIcon} size="sm" mr="$2" />
              <MenuItemLabel size="sm">Community</MenuItemLabel>
            </MenuItem>
          </Menu>

          <View>
            <Button onPress={() => setShowModal(true)} ref={ref}>
              <ButtonText>Show Modal</ButtonText>
            </Button>
            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              finalFocusRef={ref}>
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="lg">Engage with Modals</Heading>
                  <ModalCloseButton>
                    <Icon as={CloseIcon} />
                  </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                  <Text>
                    Elevate user interactions with our versatile modals.
                    Seamlessly integrate notifications, forms, and media
                    displays. Make an impact effortlessly.
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    action="secondary"
                    mr="$3"
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    action="positive"
                    borderWidth="$0"
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    <ButtonText>Explore</ButtonText>
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </View>

          <Box>
            <Button onPress={handleClose}>
              <ButtonText>Open</ButtonText>
            </Button>
            <Actionsheet
              isOpen={showActionsheet}
              onClose={handleClose}
              zIndex={999}>
              <ActionsheetBackdrop />
              <ActionsheetContent h="$72" zIndex={999}>
                <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Delete</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Share</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Play</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Favourite</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Cancel</ActionsheetItemText>
                </ActionsheetItem>
              </ActionsheetContent>
            </Actionsheet>
          </Box>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : 'height'}
            style={{ flex: 1, zIndex: 999 }}>
            <Center h="100%" zIndex={999}>
              <Button onPress={handleClose}>
                <Button.Text>Open</Button.Text>
              </Button>
              <Actionsheet
                isOpen={showActionsheet}
                onClose={handleClose}
                zIndex={999}>
                <ActionsheetBackdrop />
                <ActionsheetContent maxHeight="75%" zIndex={999}>
                  <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                  </ActionsheetDragIndicatorWrapper>
                  <VStack w="$full" p={20}>
                    <HStack
                      justifyContent="center"
                      alignItems="center"
                      space="md">
                      <Box
                        w={50}
                        h="$full"
                        px="$2"
                        borderWidth={1}
                        borderStyle="solid"
                        borderColor="$borderLight300"
                        rounded="$sm">
                        {/* <Image
                          source={{ uri: 'https://i.imgur.com/UwTLr26.png' }}
                          flex={1}
                          resizeMode="contain"
                        /> */}
                      </Box>
                      <VStack flex={1}>
                        <Text fontWeight="$bold">Mastercard</Text>
                        <Text>Card ending in 2345</Text>
                      </VStack>
                    </HStack>
                    <FormControl mt={36}>
                      <FormControlLabel>
                        <FormControlLabelText>
                          Confirm security code
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input w="$full">
                        <InputSlot>
                          <InputIcon as={InputIcon} ml="$2" />
                        </InputSlot>
                        <InputField placeholder="CVC/CVV" />
                      </Input>
                      <Button onPress={handleClose} mt={20}>
                        <ButtonText>Pay $1000</ButtonText>
                      </Button>
                    </FormControl>
                  </VStack>
                </ActionsheetContent>
              </Actionsheet>
            </Center>
          </KeyboardAvoidingView>
        </Screen>
      </View>
      <AnimatedView
        style={[StyleSheet.absoluteFillObject, canvasStyle]}
        animatedProps={canvasProps}>
        <Canvas onSize={size} style={[StyleSheet.absoluteFillObject]}>
          <Image
            x={0}
            y={0}
            fit={'cover'}
            width={widthCanvas}
            height={heightCanvas}
            image={image1}
          />

          <Circle c={circleC} r={r}>
            <ImageShader
              width={widthCanvas}
              height={heightCanvas}
              image={image2}
              fit={'cover'}
            />
          </Circle>
        </Canvas>
      </AnimatedView>
    </>
  );
};

const styleSheet = createStyleSheet(theme => ({
  text: {
    ...theme.textPresets.label,
    color: theme.color.neutral500,
  },
  root: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 15,
    backgroundColor: theme.color.background,
  },
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    columnGap: 8,
  },
  colItem: {
    paddingVertical: 15,
    rowGap: 8,
    alignItems: 'flex-start',
  },
}));
