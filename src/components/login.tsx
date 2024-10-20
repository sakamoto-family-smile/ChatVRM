import { useState, useCallback } from "react";

type Props = {
  email: string;
  password: string;
  onChangeEmail: (email: string) => void;
  onChangePassword: (password: string) => void;
};
export const Login = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
}: Props) => {
  const [opened, setOpened] = useState(true);

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeEmail(event.target.value);
    },
    [onChangeEmail]
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangePassword(event.target.value);
    },
    [onChangePassword]
  );

	// TODO : openedをトークンの期限が切れているかどうかで判定したい
  return opened ? (
    <div className="absolute z-40 w-full h-full px-24 py-40  bg-black/30 font-M_PLUS_2">
      <div className="mx-auto my-auto max-w-3xl max-h-full p-24 overflow-auto bg-white rounded-16">
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary ">
            ログイン画面
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            メールアドレス
          </div>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
          ></input>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            パスワード
          </div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
          ></input>
        </div>
        <div className="my-24">
          <button
            onClick={() => {
              setOpened(false);
            }}
            className="font-bold bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled text-white px-24 py-8 rounded-oval"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  ) : null;
};