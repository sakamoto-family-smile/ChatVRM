import { useState, useCallback, Suspense } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  const [loginState, setLoginState] = useState("notLogin")
	const env = process.env
	const iap_config = {
		apiKey: env.NEXT_PUBLIC_IAP_API_KEY,
		authDomain: env.NEXT_PUBLIC_IAP_AUTH_DOMAIN,
	}
	const initApp = initializeApp(iap_config);
	const auth = getAuth(initApp);

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

  const handleLoginBtnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
			setLoginState("startLogin")

			// TODO : ログイン処理を開始させる
			signInWithEmailAndPassword(auth, email, password)
				.then(() => {
					setLoginState("finishLogin")
					console.log("finish login")
				})
				.catch((e: unknown) => {
					setLoginState("errorLogin")
					console.log("login error!")
					if (e instanceof Error) {
						console.log(e.message)
					}
				})
    },
		[setLoginState]
  );

	const loginBtnLayout = () => {
			// ログイン処理が開始されたタイミングでは、ローディングを表示する
			if (loginState == "startLogin") {
					return (
							<div className="my-24">
									<div className="font-bold text-3xl">Loading ...</div>
							</div>
					);
			}
			// ログイン処理が完了したら、ログインページを非表示とする
			else if (loginState == "finishLogin") {
					setOpened(false)
					return (
							<div className="my-24">
							</div>
					);
			}
			// ログインエラー時はボタンを表示しつつ、エラーのダイアログを出したい
			else if (loginState == "errorLogin") {
					// TODO : エラーのダイアログを出す
					return (
							<div className="my-24">
									<button
													onClick={handleLoginBtnClick}
													className="font-bold bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled text-white px-24 py-8 rounded-oval"
											>
											ログイン
									</button>
							</div>
					);
			}
			// それ以外ではボタンを表示する
			else {
					return (
							<div className="my-24">
									<button
													onClick={handleLoginBtnClick}
													className="font-bold bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled text-white px-24 py-8 rounded-oval"
											>
											ログイン
									</button>
							</div>
					);
			}
	};

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
				{loginBtnLayout()}
      </div>
    </div>
  ) : null;
};
