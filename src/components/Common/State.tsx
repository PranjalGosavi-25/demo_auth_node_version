import {
  AnnotationQuestionOutlineIcon,
  CheckCircleOutlineIcon,
  FileQuestion01OutlineIcon,
  InfoCircleOutlineIcon,
  InfoHexagonOutlineIcon,
  MessageQuestionCircleOutlineIcon,
  MessageQuestionSquareOutlineIcon,
  XCloseOutlineIcon
} from 'newtral-icons';
import { FeaturedIcon } from './FeaturedIcon';
import { StateEnum } from '@enums/common';
import Link from 'next/link';

interface IStateProps {
  title: string;
  state: StateEnum;
  description?: string;
  backToLoginUrl?: string;
}

const StateIcon = (state: StateEnum) => {
  switch (state) {
    case StateEnum.Error:
      return XCloseOutlineIcon;
    case StateEnum.Success:
      return CheckCircleOutlineIcon;
    case StateEnum.Warning:
      return AnnotationQuestionOutlineIcon;
    case StateEnum.Gray:
      return InfoHexagonOutlineIcon;
  }
};

export const State = (props: IStateProps) => {
  const { title, state, description, backToLoginUrl } = props;

  return (
    <>
      <div className="flex justify-center pt-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <FeaturedIcon
            icon={StateIcon(state)}
            color={state}
            size={'lg'}
            variant={'double-circle-light'}
          />
          <div className="flex flex-col gap-3">
            <div className="text-3xl font-semibold">{title}</div>
            <div className="text-base text-gray-600">{description}</div>

            {backToLoginUrl && (
              <div className="w-full flex justify-center">
                <Link
                  href={backToLoginUrl}
                  className="font-semibold text-sm text-primary-700 no-underline w-fit"
                >
                  Back to login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Your attempt to access the invitation is completed or has expired.
// The invitation you are attempting to see is either completed or expired.
