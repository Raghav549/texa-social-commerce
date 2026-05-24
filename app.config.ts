import "./scripts/load-env.js";
import type { ExpoConfig } from "expo/config";

const rawBundleId = "com.texa.socialcommerce";

const bundleId =
  rawBundleId
    .replace(/[-_]/g, ".")
    .replace(/[^a-zA-Z0-9.]/g, "")
    .replace(/\.+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .toLowerCase()
    .split(".")
    .map((segment) => {
      return /^[a-zA-Z]/.test(segment) ? segment : "x" + segment;
    })
    .join(".") || "com.texa.socialcommerce";

const schemeFromBundleId = "texa";

const config: ExpoConfig = {
  name: "TEXA",
  slug: "texa-social",
  version: "1.0.0",
  orientation: "portrait",

  icon: "./assets/images/icon.png",

  scheme: schemeFromBundleId,

  userInterfaceStyle: "automatic",

  newArchEnabled: true,

  ios: {
    supportsTablet: true,
    bundleIdentifier: bundleId,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },

  android: {
    package: bundleId,

    adaptiveIcon: {
      backgroundColor: "#0A0E27",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage:
        "./assets/images/android-icon-monochrome.png",
    },

    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,

    permissions: ["POST_NOTIFICATIONS"],

    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: schemeFromBundleId,
            host: "*",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },

  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },

  plugins: [
    "expo-router",

    [
      "expo-audio",
      {
        microphonePermission:
          "Allow TEXA to access your microphone.",
      },
    ],

    [
      "expo-video",
      {
        supportsBackgroundPlayback: true,
        supportsPictureInPicture: true,
      },
    ],

    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#0A0E27",

        dark: {
          backgroundColor: "#0A0E27",
        },
      },
    ],

    [
      "expo-build-properties",
      {
        android: {
          buildArchs: ["armeabi-v7a", "arm64-v8a"],
          minSdkVersion: 24,
        },
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  extra: {
    eas: {
      projectId: "c126b850-9b96-4d54-8668-de7ff3fd6e93",
    },
  },

  owner: "kashyap67576",
};

export default config;
