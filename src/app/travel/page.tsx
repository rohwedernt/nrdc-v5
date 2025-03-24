import { Flex, Text } from "@/components/generic";
import MasonryGrid from "@/components/custom/gallery/MasonryGrid";
import styles from "./Travel.module.scss";

export default function Travel() {
  return (
    <Flex 
      fillWidth 
      padding="l"
      position="relative"
      style={{ 
        height: "calc(100vh - 60px)",
        overflow: "hidden",
        //marginTop: "56px"
      }}
    >
      <Flex 
        className={styles.gridContainer}
        fillWidth
        style={{
          height: "100%",
          overflow: "hidden"
        }}
      >
        <MasonryGrid />
      </Flex>
      <Flex 
        className={styles.overlay}
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="l"
      >
        <Text
          variant="display-strong-xxl"
          onBackground="neutral-strong"
          style={{ 
            textAlign: "center",
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            letterSpacing: "-0.02em"
          }}
        >
          Coming Soon
        </Text>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{ 
            textAlign: "center",
            maxWidth: "600px"
          }}
        >
          A collection of travel stories and adventures is on its way!
        </Text>
      </Flex>
    </Flex>
  );
}