/** @jsxImportSource @emotion/react */

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface LogoutDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  handleConfirm: () => void;
}

export default function LogoutDialog({ dialogOpen, handleDialogClose, handleConfirm }: LogoutDialogProps) {
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle
        css={{
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        정말로 로그아웃하시겠어요?
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          css={{
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          로그아웃하면 DoItNow의 모든 서비스를 사용할 수 없어요.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
