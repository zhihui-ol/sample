import { Alert, StyleSheet } from 'react-native';

import { i18n } from '@/languages/i18n';
import {
  Button, Host, HStack,
  SecureField,
  Spacer,
  Switch, Text, TextField, VStack
} from "@expo/ui/swift-ui";
import {
  background, cornerRadius,
  foregroundStyle,
  frame,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import React from 'react';
import { Controller, useForm } from "react-hook-form";

export type LoginReq = {
  email: string,
  password: string
};

export default function HomeScreen() {
  const [isOpened, setIsOpened] = React.useState(true);
  const [value, setValue] = React.useState('');
  const colorScheme = "light";
  const secondaryLabel = colorScheme === "light" ? "#3C424B" : "#A1CEDC";
  const secondarySystemBackground = colorScheme === "light" ? "#F2F2F7" : "#1D3D47";
  const systemTransparent = colorScheme === "light" ? "#FFFFFF00" : "#00000000";
  const labelColor = colorScheme === "light" ? "#000000" : "#FFFFFF";
  const systemRed = colorScheme === "light" ? "#FF3B30" : "#FF453A";
  const systemBlue = colorScheme === "light" ? "#007AFF" : "#0A84FF";

  const [isSecure, setIsSecure] = React.useState(true);
  const [isChecked, setChecked] = React.useState(false);
  const savedEmail = isChecked ? "user@example.com" : "";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginReq>({
    // resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const comingSoon = () => {
    Alert.alert(i18n.t('coming_soon'), "",
      [
        {
          text: "OK"
        },
      ])
  };

  return (
    <Host style={{ flex: 1 }} colorScheme={colorScheme}>
      <VStack
        spacing={34}
        alignment="leading"
        modifiers={[
          frame({
            maxWidth: Infinity,
            maxHeight: Infinity,
            alignment: "top",
          }),
          padding({
            horizontal: 20,
            top: 10,
          }),
        ]}
      >

        <Text testID='welcome' modifiers={[]} size={32}>Welcome back</Text>

        <Text color={secondaryLabel}>
          Enter your email and password to sign in to your account
        </Text>
        <VStack spacing={18}>
          <VStack spacing={18}>
            <Button
              testID='login_apple_id'
              onPress={comingSoon}
              color={secondarySystemBackground}
              variant="glassProminent"
              controlSize="large"
              modifiers={[background(systemTransparent), cornerRadius(30)]}
            >
              <HStack
                spacing={8}
                modifiers={[
                  frame({
                    maxWidth: Infinity,
                    alignment: "center",
                    height: 20,
                  }),
                ]}
              >
                <Spacer />
                {/* <Image systemName="apple.logo" color={labelColor} /> */}
                <Text color={labelColor}>Continue with Apple</Text>
                <Spacer />
              </HStack>

            </Button>
            <Button
              onPress={comingSoon}
              color={secondarySystemBackground}
              variant="glassProminent"
              controlSize="large"
              modifiers={[background(systemTransparent), cornerRadius(30)]}
            >
              <HStack
                modifiers={[
                  frame({
                    width: Infinity,
                    alignment: "center",
                    height: 20,
                  }),
                ]}
                spacing={8}
              >
                <Spacer />
                {/* <HStack modifiers={[frame({ width: 20, height: 20, alignment: "center" })]}>
                  <RNImage
                    source={require("@/assets/images/google.png")}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    resizeMode="contain"
                  />
                </HStack> */}
                <Text color={labelColor}>Continue with Google</Text>
                <Spacer />
              </HStack>
            </Button>
          </VStack>

          <HStack alignment="center">
            <Spacer />
            <Text modifiers={[foregroundStyle({ type: "color", color: secondaryLabel })]}>
              or
            </Text>
            <Spacer />
          </HStack>

          <VStack spacing={30}>
            <VStack spacing={8} alignment="leading">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    testID='account'
                    key={savedEmail || "email-input"}
                    modifiers={[
                      frame({
                        maxWidth: Infinity,
                      }),
                      background(secondarySystemBackground),
                      cornerRadius(30),
                    ]}
                    placeholder="Email"
                    defaultValue={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autocorrection={false}
                  />
                )}
              />
              {errors.email && (
                <Text children={errors.email.message ?? ''}></Text>
              )}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <HStack
                    modifiers={[
                      background(secondarySystemBackground),
                      cornerRadius(30),
                    ]}
                  >
                    {isSecure ? (
                      <SecureField
                        testID='password'
                        placeholder="Password"
                        defaultValue={value}
                        onChangeText={onChange}
                      />
                    ) : (
                      <TextField
                        testID='password'
                        placeholder="Password"
                        defaultValue={value}
                        onChangeText={onChange}
                        autocorrection={false}
                      />
                    )}
                    <Spacer />
                    <Button
                      systemImage={isSecure ? "eye.slash" : "eye"}
                      onPress={() => setIsSecure((prev) => !prev)}
                      color={secondaryLabel}
                    />
                  </HStack>
                )}
              />
              {errors.password && (
                <Text
                  color={systemRed}
                  modifiers={[
                    padding({
                      leading: 8,
                    }),
                  ]}
                  children={errors.password.message ?? ''}
                >

                </Text>
              )}
            </VStack>

            <HStack alignment="center">
              <Switch
                color={labelColor}
                value={isChecked}
                onValueChange={(value) => {
                  setChecked(value);
                  if (!value) {
                    // clearEmail();
                  }
                }}
                variant="checkbox"
                label="Remember me"
              />
              <Spacer />
              <Button
                // onPress={() => router.navigate("/")}
                modifiers={[foregroundStyle({ type: "color", color: systemBlue })]}
                variant="link"
              >
                Forgot password?
              </Button>
            </HStack>

            <Button
              variant="glassProminent"
              controlSize="large"
              color={systemBlue}
              onPress={comingSoon}
              // onPress={handleSubmit(onSubmit, onError)}
              // disabled={signIn.isPending}
              modifiers={[cornerRadius(30)]}
            >
              <HStack
                modifiers={[
                  frame({
                    width: Infinity,
                    alignment: "center",
                    height: 20,
                  }),
                ]}
                spacing={8}
              >
                <Spacer />
                {/* {signIn.isPending && (
                    <HStack modifiers={[frame({ width: 20, height: 20, alignment: "center" })]}>
                      <RNView
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      >
                        <ActivityIndicator
                          size="small"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      </RNView>
                    </HStack>
                  )} */}
                <Text>Sign in</Text>
                <Spacer />
              </HStack>
            </Button>

            <HStack alignment="center" modifiers={[padding({ all: 20 })]}>
              <Spacer />
              <Text>Don&apos;t have an account? </Text>
              <Button
                // onPress={() => router.replace("/")}
                onPress={comingSoon}
                variant="link">
                Sign up
              </Button>
              <Spacer />
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Host>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    // gap: 8,
    // marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
