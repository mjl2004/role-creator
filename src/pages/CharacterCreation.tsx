import React, { useState, useEffect, useRef } from 'react';
import { faCheck, faArrowRight, faVenus, faMars, faBriefcase, faHeart, faStar, faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import '../css/CharacterCreation.css';

// 类型定义保持不变
type Gender = 'male' | 'female' | '';
type InterestCategory = 'career' | 'personality' | 'skill';

interface InterestOption {
  id: string;
  name: string;
  category: InterestCategory;
}

interface CharacterClass  {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const CharacterCreation: React.FC = () => {
  // 原有状态保持不变
  const nav = useNavigate()
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState<string>('');
  
  // 新增星星容器的ref
  const starsContainerRef = useRef<HTMLDivElement>(null);

  const submit = () => {
    nav('/generate')
  }

  // 兴趣选项数据保持不变
  const interestOptions: InterestOption[] = [
    // 职业兴趣
    { id: 'c1', name: '技术研发', category: 'career' },
    { id: 'c2', name: '商业管理', category: 'career' },
    { id: 'c3', name: '艺术创作', category: 'career' },
    { id: 'c4', name: '社会服务', category: 'career' },
    { id: 'c5', name: '金融分析', category: 'career' },
    { id: 'c6', name: '媒体传播', category: 'career' },
    { id: 'c7', name: '医疗健康', category: 'career' },
    { id: 'c8', name: '法律政务', category: 'career' },
    { id: 'c9', name: '动手操作', category: 'career' },
    
    // 性格特点
    { id: 'p1', name: '外向健谈', category: 'personality' },
    { id: 'p2', name: '内向沉稳', category: 'personality' },
    { id: 'p3', name: '责任心强', category: 'personality' },
    { id: 'p4', name: '随性自由', category: 'personality' },
    { id: 'p5', name: '乐观积极', category: 'personality' },
    { id: 'p6', name: '谨慎细致', category: 'personality' },
    { id: 'p7', name: '冒险敢为', category: 'personality' },
    { id: 'p8', name: '合作包容', category: 'personality' },
    { id: 'p9', name: '领导力强', category: 'personality' },
    { id: 'p10', name: '创意丰富', category: 'personality' },
    { id: 'p11', name: '逻辑严谨', category: 'personality' },
    { id: 'p12', name: '情感细腻', category: 'personality' },
    { id: 'p13', name: '目标导向', category: 'personality' },
    { id: 'p14', name: '学习力强', category: 'personality' },
    { id: 'p15', name: '抗压能力强', category: 'personality' },
    { id: 'p16', name: '表达能力强', category: 'personality' },
    { id: 'p17', name: '独立自主', category: 'personality' },
    
    // 技能特长
    { id: 's1', name: '编程开发', category: 'skill' },
    { id: 's2', name: '数据分析', category: 'skill' },
    { id: 's3', name: '人工智能', category: 'skill' },
    { id: 's4', name: '网络安全', category: 'skill' },
    { id: 's5', name: '硬件维修', category: 'skill' },
    { id: 's6', name: '机械设计', category: 'skill' },
    { id: 's7', name: '视频剪辑', category: 'skill' },
    { id: 's8', name: '3D建模', category: 'skill' },
    { id: 's9', name: '平面设计', category: 'skill' },
    { id: 's10', name: 'UI/UX设计', category: 'skill' },
    { id: 's11', name: '插画绘画', category: 'skill' },
    { id: 's12', name: '摄影摄像', category: 'skill' },
    { id: 's13', name: '音乐制作', category: 'skill' },
    { id: 's14', name: '文案写作', category: 'skill' },
    { id: 's15', name: '项目管理', category: 'skill' },
    { id: 's16', name: '商业分析', category: 'skill' },
    { id: 's17', name: '逻辑推理', category: 'skill' },
    { id: 's18', name: '创意策划', category: 'skill' },
    { id: 's19', name: '公开演讲', category: 'skill' },
    { id: 's20', name: '销售谈判', category: 'skill' },
    { id: 's21', name: '跨文化沟通', category: 'skill' },
    { id: 's22', name: '用户运营', category: 'skill' },
    { id: 's23', name: '财务会计', category: 'skill' },
    { id: 's24', name: '法律文书', category: 'skill' },
    { id: 's25', name: '电商运营', category: 'skill' },
    { id: 's26', name: '新媒体运营', category: 'skill' },
    { id: 's27', name: '心理咨询', category: 'skill' },
    { id: 's28', name: '健康管理', category: 'skill' },
    { id: 's29', name: '教育培训', category: 'skill' },
    { id: 's30', name: '应急救护', category: 'skill' },
  ];

  // 推荐职业数据
  const characterClasses: CharacterClass[] = [
    { 
      id: 'warrior', 
      name: '战士', 
      description: '擅长近战格斗，拥有强大的防御力',
      icon: <FontAwesomeIcon icon={faStar} size="2x" />
    },
    { 
      id: 'mage', 
      name: '法师', 
      description: '掌握元素魔法，能够造成巨大的范围伤害',
      icon: <FontAwesomeIcon icon={faMagic} size="2x" />
    },
    { 
      id: 'rogue', 
      name: '盗贼', 
      description: '身手敏捷，擅长潜行和偷袭',
      icon: <FontAwesomeIcon icon={faBriefcase} size="2x" />
    }
  ];

  // 处理兴趣选择
  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(interestId => interestId !== id)
        : [...prev, id]
    );
  };

  // 处理步骤导航保持不变
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // 新增：星星随机出现和消失的效果
  useEffect(() => {
    const createRandomStar = () => {
      if (!starsContainerRef.current) return;

      // 创建星星元素
      const star = document.createElement('div');
      star.className = 'star';
      
      // 随机大小 (1-3px)
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // 随机位置
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      
      // 随机透明度 (0.3-1.0)
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      
      // 添加到容器
      starsContainerRef.current.appendChild(star);
      
      // 随机时间后让星星消失 (2-5秒)
      const lifeTime = Math.random() * 3000 + 10000;
      setTimeout(() => {
        // 淡出动画
        star.style.opacity = '0';
        // 动画结束后移除元素
        setTimeout(() => {
          star.remove();
        }, 500);
      }, lifeTime);
    };

    // 初始创建一批星星
    for (let i = 0; i < 100; i++) {
      createRandomStar();
    }

    // 定时创建新星星 (每300ms创建一个)
    const interval = setInterval(createRandomStar, 100);

    // 组件卸载时清理
    return () => {
      clearInterval(interval);
      if (starsContainerRef.current) {
        starsContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  // 渲染步骤指示器保持不变
  const renderStepIndicator = () => (
    <div className="flex justify-center items-center mb-8">
      {[1, 2, 3, 4].map(step => (
        <React.Fragment key={step}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === step 
              ? 'bg-purple-600 text-white' 
              : currentStep > step 
                ? 'bg-purple-100 text-purple-600' 
                : 'bg-gray-100 text-gray-400'
          }`}>
            {currentStep > step ? <FontAwesomeIcon icon={faCheck} size="sm" /> : step}
          </div>
          {step < 4 && (
            <div className={`w-8 h-1 ${currentStep > step ? 'bg-purple-600' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // 各个步骤的渲染函数保持不变
  // 1. 设置昵称界面
  const renderNicknameStep = () => (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-black mb-2">设置你的昵称</h2>
      <p className="text-gray-500 mb-8 text-center">请输入一个独特的昵称，将在游戏中展示</p>
      
      <div className="w-full max-w-xs mb-8">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="请输入昵称"
          className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 focus:outline-none transition-all"
        />
      </div>
      
      <button
        onClick={nextStep}
        disabled={!nickname.trim()}
        className={`px-8 py-3 rounded-lg font-medium transition-all ${
          nickname.trim()
            ? 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        确认
        <FontAwesomeIcon icon={faArrowRight} className="ml-2" size="sm" />
      </button>
    </div>
  );
  // 2. 完善个人信息界面（性别选择）
  const renderGenderStep = () => (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-black mb-2">选择你的性别</h2>
      <p className="text-gray-500 mb-8 text-center">这将影响你的游戏角色外观</p>
      
      <div className="grid grid-cols-2 gap-6 mb-10">
        <button
          onClick={() => setGender('male')}
          className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
            gender === 'male' 
              ? 'border-purple-500 bg-purple-900/30 shadow-lg' 
              : 'border-gray-700 bg-gray-900/50 hover:border-purple-700'
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
            gender === 'male' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
          }`}>
            <FontAwesomeIcon icon={faMars} size="2x" />
          </div>
          <span className="font-medium text-white">男性</span>
          {gender === 'male' && (
            <FontAwesomeIcon icon={faCheck} className="mt-2 text-purple-500" size="sm" />
          )}
        </button>
        
        <button
          onClick={() => setGender('female')}
          className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
            gender === 'female' 
              ? 'border-purple-500 bg-purple-900/30 shadow-lg' 
              : 'border-gray-700 bg-gray-900/50 hover:border-purple-700'
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
            gender === 'female' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
          }`}>
            <FontAwesomeIcon icon={faVenus} size="2x" />
          </div>
          <span className="font-medium text-white">女性</span>
          {gender === 'female' && (
            <FontAwesomeIcon icon={faCheck} className="mt-2 text-purple-500" size="sm" />
          )}
        </button>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-lg font-medium border border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800 transition-all"
        >
          上一步
        </button>
        <button
          onClick={nextStep}
          disabled={!gender}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            gender
              ? 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          开始探索
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" size="sm" />
        </button>
      </div>
    </div>
  );
  // 3. 选择兴趣界面
  const renderInterestsStep = () => (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-black mb-2 text-center">选择你的兴趣</h2>
      <p className="text-gray-500 mb-8 text-center">选择符合你喜好的选项，帮助我们为你推荐合适的角色</p>
      
      {/* 职业兴趣 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-purple-500" />
          职业兴趣
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {interestOptions
            .filter(option => option.category === 'career')
            .map(option => (
              <button
                key={option.id}
                onClick={() => toggleInterest(option.id)}
                className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                  selectedInterests.includes(option.id)
                    ? 'border-purple-500 bg-purple-900/30 text-white'
                    : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-purple-700'
                }`}
              >
                <span>{option.name}</span>
                {selectedInterests.includes(option.id) && (
                  <FontAwesomeIcon icon={faCheck} className="ml-1 text-purple-500" size="sm" />
                )}
              </button>
            ))}
        </div>
      </div>
      
      {/* 性格特点 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faHeart} className="mr-2 text-purple-500" />
          性格特点
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {interestOptions
            .filter(option => option.category === 'personality')
            .map(option => (
              <button
                key={option.id}
                onClick={() => toggleInterest(option.id)}
                className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                  selectedInterests.includes(option.id)
                    ? 'border-purple-500 bg-purple-900/30 text-white'
                    : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-purple-700'
                }`}
              >
                <span>{option.name}</span>
                {selectedInterests.includes(option.id) && (
                  <FontAwesomeIcon icon={faCheck} className="ml-1 text-purple-500" size="sm" />
                )}
              </button>
            ))}
        </div>
      </div>
      
      {/* 技能特长 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faStar} className="mr-2 text-purple-500" />
          技能特长
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {interestOptions
            .filter(option => option.category === 'skill')
            .map(option => (
              <button
                key={option.id}
                onClick={() => toggleInterest(option.id)}
                className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                  selectedInterests.includes(option.id)
                    ? 'border-purple-500 bg-purple-900/30 text-white'
                    : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-purple-700'
                }`}
              >
                <span>{option.name}</span>
                {selectedInterests.includes(option.id) && (
                  <FontAwesomeIcon icon={faCheck} className="ml-1 text-purple-500" size="sm" />
                )}
              </button>
            ))}
        </div>
      </div>
      
      <div className="flex space-x-4 justify-center">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-lg font-medium border border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800 transition-all"
        >
          上一步
        </button>
        <button
          onClick={nextStep}
          disabled={selectedInterests.length < 3}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            selectedInterests.length >= 3
              ? 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          完成设置
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" size="sm" />
        </button>
      </div>
    </div>
  );
  // 4. 修改后的职业选择界面
  const renderCharacterClassStep = () => {
    return (
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">选择职业</h2>
        <p className="text-gray-500 mb-8 text-center">请选择你想要扮演的职业角色</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {characterClasses.map(cls => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`rounded-xl p-5 border-2 transition-all w-full text-left cursor-pointer ${
                selectedClass === cls.id
                  ? 'border-purple-600 bg-purple-50 shadow-lg scale-[1.02]' 
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                {cls.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{cls.name}</h3>
              <p className="text-gray-600 text-sm">{cls.description}</p>
              
              {/* 选中状态指示器 */}
              {selectedClass === cls.id && (
                <div className="mt-4 flex items-center text-purple-600">
                  <FontAwesomeIcon icon={faCheck} size="sm" className="mr-1" />
                  <span className="text-sm font-medium">已选择</span>
                </div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-4 justify-center">
          <button
            onClick={prevStep}
            className="px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
          >
            上一步
          </button>
          <button
            className="px-8 py-3 rounded-lg font-medium transition-all"
            onClick={submit}
            disabled={!selectedClass}
            style={{
              backgroundColor: selectedClass ? '#7c3aed' : '#e5e7eb',
              color: selectedClass ? 'white' : '#9ca3af',
              cursor: selectedClass ? 'pointer' : 'not-allowed'
            }}
          >
            完成创建
            <FontAwesomeIcon icon={faCheck} className="ml-2" size="sm" />
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderNicknameStep();
      case 2:
        return renderGenderStep();
      case 3:
        return renderInterestsStep();
      case 4:
        return renderCharacterClassStep();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative overflow-hidden starry-background">
      {/* 星星容器 - 新增 */}
      <div 
        ref={starsContainerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* 步骤指示器 */}
        {renderStepIndicator()}
        
        {/* 主内容区 */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
            {renderCurrentStep()}
          </div>
        </div>
        
        {/* 底部说明 */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          完成角色创建后，你将进入游戏世界开始冒险
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;