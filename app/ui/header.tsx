import React from "react";
import ProgressBar from "./progress-bar";

interface HeaderProps {
  score: number;
  timeRemaining?: number;
  progress?: number;
  showProgress?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  score,
  timeRemaining,
  progress = 0,
  showProgress = false,
}) => {
  return (
    <header className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg">
          スコア: <span className="text-blue-600">{score}</span>点
        </div>
        {timeRemaining !== undefined && (
          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
            残り時間: {timeRemaining}秒
          </div>
        )}
      </div>

      {showProgress && <ProgressBar progress={progress} />}
    </header>
  );
};

export default Header;
