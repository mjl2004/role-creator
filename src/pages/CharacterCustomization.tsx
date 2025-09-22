import React, { useEffect, useRef } from 'react';
import '../css/CharacterCustomization.css'; // 假设样式文件与组件同目录
import { useNavigate } from 'react-router-dom';

const CharacterCustomization: React.FC = () => {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  // 创建随机星星
  useEffect(() => {
    const createStars = () => {
      if (!starsContainerRef.current) return;
      
      const starCount = 100; // 星星数量
      starsContainerRef.current.innerHTML = ''; // 清空容器
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机大小
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机初始位置
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        
        // 随机结束位置（用于动画）
        const endX = startX + (Math.random() * 100 - 50);
        const endY = startY + (Math.random() * 100 - 50);
        star.style.setProperty('--x-end', `${endX}%`);
        star.style.setProperty('--y-end', `${endY}%`);
        
        // 随机动画持续时间
        const duration = Math.random() * 20 + 10;
        star.style.animationDuration = `${duration}s`;
        
        // 随机动画延迟
        const delay = Math.random() * 10;
        star.style.animationDelay = `${delay}s`;
        
        // 随机透明度
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        
        starsContainerRef.current.appendChild(star);
      }
    };

    createStars();
  }, []);

  // 按钮点击处理
  const handleStartClick = () => {
    // 这里可以添加"立即开始"按钮的点击事件逻辑
    console.log('开始角色定制');
    // 例如：导航到角色定制页面
    // navigate('/customize');
    nav('/login')
  };

  return (
    <div className="character-customization-container">
      {/* 星星背景容器 */}
      <div ref={starsContainerRef} className="stars-container" />
      
      {/* 主内容容器 */}
      <div className="main-content">
        {/* 标题 */}
        <h1 className="title">定制你的角色</h1>
        
        {/* 按钮 */}
        <button 
          className="start-button"
          onClick={handleStartClick}
        >
          立即开始
        </button>
      </div>
    </div>
  );
};

export default CharacterCustomization;
    