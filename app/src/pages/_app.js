import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import ReactGA from "react-ga";
import TopBarProgress from "react-topbar-progress-indicator";
import { SWRConfig } from "swr";

import progressBarConfig from "@/config/progress-bar/index";
import swrConfig from "@/config/swr/index";
import WorkspaceProvider from "@/providers/workspace";
import { BubbleChat } from "flowise-embed-react";

import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(false);
  const router = useRouter();
  const swrOptions = swrConfig();

  Router.events.on("routeChangeStart", () => setProgress(true));
  Router.events.on("routeChangeComplete", () => setProgress(false));
  TopBarProgress.config(progressBarConfig());

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ReactGA.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={swrOptions}>
        <ThemeProvider attribute="class">
          <WorkspaceProvider>
            {progress && <TopBarProgress />}
            <BubbleChat
              chatflowid="8c416847-3999-4248-8167-1220917c9e2d"
              apiHost="https://flow.discontinuity.ai"
              theme={{
                chatWindow: {
                  welcomeMessage:
                    "Hello! This is a sample bot designed with the Discontinuity.AI process. It was trained with the <a href='/start'>Getting Started</a> page and can help you understand the Discontinuity.AI process<br/>Chatbots are an easy quick way to get started and comes included in all packages.",
                  backgroundColor: "#ffffff",
                  height: 700,
                  width: 400,
                  fontSize: 16,
                  poweredByTextColor: "#ffffff",
                  botMessage: {
                    backgroundColor: "#f7f8ff",
                    textColor: "#303235",
                    showAvatar: true,
                    avatarSrc:
                      "https://discontinuity.ai/static/images/icon.svg",
                  },
                  userMessage: {
                    backgroundColor: "#3B81F6",
                    textColor: "#ffffff",
                    showAvatar: true,
                  },
                  textInput: {
                    placeholder: "Ask about Discontinuity.AI",
                    backgroundColor: "#ffffff",
                    textColor: "#303235",
                    sendButtonColor: "#3B81F6",
                  },
                },
              }}
            />
            <Component {...pageProps} />
          </WorkspaceProvider>
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default App;
