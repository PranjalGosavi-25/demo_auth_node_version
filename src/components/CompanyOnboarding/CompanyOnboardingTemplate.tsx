import { useRef, useState } from 'react';
import { Image } from 'antd';
import playButton from '../../../public/images/play-button.svg';
import bottomLinePattern from '../../../public/images/bottom-line-pattern.svg';
import topLinePattern from '../../../public/images/top-line-pattern.svg';

export const CompanyOnboardingTemplate = (props: {
  videoURL?: string;
  children: React.ReactNode;
}) => {
  const [showControls, setShowControls] = useState(false);

  const videoElement = useRef<any>();
  function showVideo() {
    setShowControls(true);
    videoElement.current.play();
  }

  return (
    <div className="grid grid-cols-2 h-screen ">
      <div className="p-8">
        <img src="/images/newtral-logo-light-mode.svg" className=" " />
        <div className="flex flex-col justify-center items-center h-full">
          {props.children}
        </div>
      </div>

      {props.videoURL ? (
        <div className="bg-indigo-100 flex justify-center items-center relative px-36  2xl:px-36 xl:px-20 lg:px-16 md:px-10">
          <div
            className=" absolute z-20 rounded-2xl flex justify-center  items-center "
            onClick={showVideo}
            style={{
              display: `${showControls ? 'none' : 'block'}`
            }}
          >
            <Image alt="play button" src={playButton.src} preview={false} />
          </div>
          <img
            src={bottomLinePattern.src}
            alt="line pattern"
            className="w-298 h-408 absolute bottom-0 left-0"
          />
          <img
            src={topLinePattern.src}
            alt="line pattern"
            className="w-298 h-408 absolute top-0 right-0"
          />

          <div className="w-full relative border-8 md:border-4 border-solid border-indigo-900 outline-none rounded-2xl z-10 overflow-hidden flex">
            <video
              // width="510"
              // height="345"
              controls={showControls}
              ref={videoElement}
              className="w-full h-full object-cover"
              controlsList="nodownload"
            >
              <source src={props.videoURL} type="video/mp4" />
            </video>
          </div>
        </div>
      ) : (
        <div
          className="bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/images/company-onboarding.svg')" }}
        ></div>
      )}
    </div>
  );
};
