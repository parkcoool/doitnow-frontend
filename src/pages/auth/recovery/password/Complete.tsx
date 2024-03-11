/** @jsxImportSource @emotion/react */
import Lottie from "lottie-react";

import completeAnimation from "assets/lottie/complete.json";

export default function Complete() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie
        animationData={completeAnimation}
        loop={false}
        css={{
          width: "100px",
          height: "100px",
          margin: "0 auto",
          "> svg": {
            transform: "unset !important",
          },
        }}
      />

      <h1
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "20px",
          fontWeight: 600,
          margin: "4px 0 0 0",
        }}
      >
        비밀번호를 재설정했어요.
      </h1>

      <h2
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "14px",
          fontWeight: 400,
          margin: "4px 0 0 0",
          color: "#666",
        }}
      >
        지금 새로운 비밀번호로 로그인해보세요.
      </h2>
    </div>
  );
}
