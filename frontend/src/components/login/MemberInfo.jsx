import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const MemberInfo = ({ setUsername, setEmail, setProfileImg }) => {
  const { isLoggedIn, token, isInitialized, initialize } = useAuthStore();
  const [message, setMessage] = useState("");
  const router = useRouter();

  console.log(token, "회원조회시작");
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }
      // 소셜 로그인
      const storedUserName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("email");
      const storedProfileImg = localStorage.getItem("profileImg");

      if (storedUserName) {
        console.log("저장되어있으면");
        setUsername(storedUserName);
        setEmail(storedEmail);
        setProfileImg(storedProfileImg);
      } else {
        console.log("읽어와야함");
        const fetchProfile = async () => {
          try {
            const response = await fetch("/api/users/profile", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              throw new Error("프로필 정보를 가져오는데 실패했습니다.");
            }

            const data = await response.json();
            console.log(data, "회원정보뭐가");
            localStorage.setItem("email", data.email);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("profileImg", data.profileUrl);
            setUsername(data.name);
            setEmail(data.email);
          } catch (error) {
            console.error("Error fetching profile:", error);
            setMessage("프로필 정보를 가져오는데 실패했습니다.");
          }
        };

        fetchProfile();
      }
    }
  }, [isInitialized, isLoggedIn, token, router, setUsername, setEmail]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }
};

export default MemberInfo;
