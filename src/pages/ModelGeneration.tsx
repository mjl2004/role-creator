// ModelGeneration.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck as faCheckSolid } from '@fortawesome/free-solid-svg-icons';
import '../css/CharacterCustomization.css'; // 星星背景样式在此文件里

/* ------------------------------------------------------------------ */
/* 与 CharacterCreation 保持完全一致的步骤指示器组件 */
/* ------------------------------------------------------------------ */
const StepIndicator: React.FC<{ current: number; total?: number }> = ({
  current,
  total = 3,
}) => (
  <div className="flex justify-center items-center mb-8">
    {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
      <React.Fragment key={step}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            current === step
              ? 'bg-purple-600 text-white'
              : current > step
              ? 'bg-purple-100 text-purple-600'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {current > step ? (
            <FontAwesomeIcon icon={faCheckSolid} size="sm" />
          ) : (
            step
          )}
        </div>
        {step < total && (
          <div
            className={`w-8 h-1 ${
              current > step ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* 颜色数据 */
/* ------------------------------------------------------------------ */
const colorOptions = {
  skin: ['#F5D6B3', '#E6B89C', '#D4A276', '#C08F63', '#A67C52'],
  hair: ['#000000', '#3A2E39', '#5C4033', '#8B5A2B', '#CD853F', '#D2B48C'],
  top: ['#7B61FF', '#5D3FD3', '#4B0082', '#8A2BE2', '#9932CC'],
  pants: ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'],
  accessory: ['#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#FF4500'],
};

/* ------------------------------------------------------------------ */
/* 主组件 */
/* ------------------------------------------------------------------ */
const ModelGeneration: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedColors, setSelectedColors] = useState({
    skin: colorOptions.skin[1],
    hair: colorOptions.hair[2],
    top: colorOptions.top[0],
    pants: colorOptions.pants[1],
    accessory: colorOptions.accessory[0],
  });

  /* -------------- 星星背景 -------------- */
  const starsContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const createStars = () => {
      if (!starsContainerRef.current) return;
      starsContainerRef.current.innerHTML = '';
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        star.style.animationDuration = `${Math.random() * 20 + 10}s`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        starsContainerRef.current.appendChild(star);
      }
    };
    createStars();
  }, []);

  /* -------------- 页面切换 -------------- */
  const nextPage = () =>
    currentPage < 2 && setCurrentPage((p) => p + 1);
  const prevPage = () =>
    currentPage > 0 && setCurrentPage((p) => p - 1);

  const handleColorSelect = (category: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [category]: color }));
  };

  const handleComplete = () => {
    console.log('角色创建完成', selectedColors);
  };

  /* -------------- 渲染 -------------- */
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 星星背景 */}
      <div
        ref={starsContainerRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 主内容区 */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {/* 顶部步骤指示器 */}
        <StepIndicator current={currentPage + 1} />

        {/* 页面内容 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
          {currentPage === 0 && (
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-gray-200 rounded-2xl aspect-square flex items-center justify-center shadow-inner">
                <p className="text-gray-500 text-center">模型轮播区域</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={nextPage}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  下一步 <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {currentPage === 1 && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center shadow-inner">
                <p className="text-gray-500">3D模型展示</p>
              </div>

              {/* 颜色选择区域 */}
              {(['skin', 'hair', 'top', 'pants', 'accessory'] as const).map(
                (key) => (
                  <div key={key} className="grid grid-cols-1 gap-2">
                    <h3 className="text-gray-700 font-medium">
                      {key === 'skin' && '选择肤色'}
                      {key === 'hair' && '选择头发颜色'}
                      {key === 'top' && '选择上衣颜色'}
                      {key === 'pants' && '选择裤子颜色'}
                      {key === 'accessory' && '选择饰品'}
                    </h3>
                    <div className="flex space-x-5 pb-2">
                      {colorOptions[key].map((color, idx) => (
                        <button
                          key={`${key}-${idx}`}
                          onClick={() => handleColorSelect(key, color)}
                          className={`w-10 h-10 rounded-full transition-all transform ${
                            selectedColors[key] === color
                              ? 'ring-2 ring-purple-500 scale-110'
                              : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: color }}
                          aria-label={`${key} ${idx + 1}`}
                        >
                          {selectedColors[key] === color && (
                            <FontAwesomeIcon
                              icon={faCheckSolid}
                              color="white"
                              fontSize="0.9em"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}

              <div className="flex justify-between pt-4">
                <button
                  onClick={prevPage}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full shadow transition-all flex items-center gap-2"
                >
                  <FaArrowLeft /> 上一步
                </button>
                <button
                  onClick={nextPage}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  下一步 <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center shadow-inner">
                <p className="text-gray-500">最终模型展示</p>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  确认你的角色
                </h2>
                <p className="text-gray-600">
                  确认后将无法修改角色外观
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {(['skin', 'hair', 'top', 'pants', 'accessory'] as const).map(
                  (key) => (
                    <div key={key} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{
                          backgroundColor: selectedColors[key],
                        }}
                      />
                      <span className="text-gray-700">
                        {key === 'skin' && '肤色'}
                        {key === 'hair' && '头发'}
                        {key === 'top' && '上衣'}
                        {key === 'pants' && '裤子'}
                        {key === 'accessory' && '饰品'}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={prevPage}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full shadow transition-all flex items-center gap-2"
                >
                  <FaArrowLeft /> 上一步
                </button>
                <button
                  onClick={handleComplete}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  完成设置 <FaCheck />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelGeneration;