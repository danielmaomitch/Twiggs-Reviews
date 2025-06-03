import { IReviewContent } from "@/pages/catalog/Types";
import { useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

const useReviewCardLogic = (review: IReviewContent | undefined) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const [mouseHover, setMouseHover] = useState(false);
  const reviewInfo = review?.reviewContent.generalInfo;
  const profileImg = session?.user?.image as string;

  const handleDeleteClick = useCallback(async (id: number | undefined) => {
    const response = await fetch(
      `http://localhost:8080/catalog/review/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log("review id: ", id);
    console.log("Review Delete response: ", data);
  }, []);

  return {
    session,
    theme,
    mouseHover,
    reviewInfo,
    profileImg,
    setMouseHover,
    handleDeleteClick,
  };
};

export default useReviewCardLogic;
