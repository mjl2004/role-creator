// src/utils/recommend.ts
import { interestToMainClass, rarityBonus } from '../data/careerindex';

const mainClassName: Record<string, string> = {
  'software-engineer': '软件工程师',
  'system-architect': '系统架构师',
  'ai-engineer': 'AI 算法工程师',
  'test-engineer': '测试工程师',
  'cyber-security': '网络安全专家',
  'data-scientist': '数据科学家',
  'mechanical-engineer': '机械工程师',
  'product-mgr': '产品经理',
  'project-mgr': '项目经理',
  'brand-mgr': '品牌经理',
  'strategic-analyst': '战略分析师',
  'graphic-designer': '平面设计师',
  'ui-designer': 'UI/UX 设计师',
  'illustrator': '插画师',
  'short-video-dir': '短视频导演',
  'music-producer': '音乐制作人',
  'photographer': '摄影师',
  'ad-creative-dir': '广告创意总监',
  'copywriter': '文案策划师',
  'psychologist': '心理咨询师',
  'teacher': '小学教师',
  'social-worker': '社会工作者',
  'nutritionist': '公共营养师',
  'fitness-coach': '健身教练',
  'investment-analyst': '投资分析师',
  'cpa': '注册会计师',
  'sec-trader': '证券交易员',
  'risk-controller': '风控专员',
  'new-media-editor': '新媒体编辑',
  'short-video-blogger': '短视频博主',
  'brand-pr': '品牌公关专员',
  'docu-director': '纪录片导演',
  'doctor': '临床医生',
  'nurse': '护士',
  'sales-rep': '医药代表',
  'health-lecturer': '健康科普讲师',
  'lawyer': '律师',
  'judge-assistant': '法官助理',
  'policy-researcher': '政策研究员',
  'compliance-mgr': '合规经理',
  'electrician': '电工',
  'cnc-tech': '数控技师',
  'car-repairer': '汽车维修师',
  'interior-designer': '室内装潢师',
  'e-commerce-owner': '跨境电商店主',
  'taobao-owner': '淘宝店主',
  'indie-game-dev': '独立游戏开发者',
  'algo-trader': '算法交易策略师',
  'data-product-mgr': '数据产品经理',
  'growth-hacker': '用户增长黑客',
  'community-op': '社群运营专员',
  'live-op-lead': '直播运营主管',
  'intl-business': '国际商务专员',
  'tech-writer': '技术写作顾问',
  'public-speaker': '自由演讲培训师',
};

const subClassName: Record<string, string> = {
  'software-engineer': '软件工程师',
  'system-architect': '系统架构师',
  'ai-engineer': 'AI 算法工程师',
  'test-engineer': '测试工程师',
  'cyber-security': '网络安全专家',
  'data-scientist': '数据科学家',
  'mechanical-engineer': '机械工程师',
  'product-mgr': '产品经理',
  'project-mgr': '项目经理',
  'brand-mgr': '品牌经理',
  'strategic-analyst': '战略分析师',
  'graphic-designer': '平面设计师',
  'ui-designer': 'UI/UX 设计师',
  'illustrator': '插画师',
  'short-video-dir': '短视频导演',
  'music-producer': '音乐制作人',
  'photographer': '摄影师',
  'ad-creative-dir': '广告创意总监',
  'copywriter': '文案策划师',
  'psychologist': '心理咨询师',
  'teacher': '小学教师',
  'social-worker': '社会工作者',
  'nutritionist': '公共营养师',
  'fitness-coach': '健身教练',
  'investment-analyst': '投资分析师',
  'cpa': '注册会计师',
  'sec-trader': '证券交易员',
  'risk-controller': '风控专员',
  'new-media-editor': '新媒体编辑',
  'short-video-blogger': '短视频博主',
  'brand-pr': '品牌公关专员',
  'docu-director': '纪录片导演',
  'doctor': '临床医生',
  'nurse': '护士',
  'sales-rep': '医药代表',
  'health-lecturer': '健康科普讲师',
  'lawyer': '律师',
  'judge-assistant': '法官助理',
  'policy-researcher': '政策研究员',
  'compliance-mgr': '合规经理',
  'electrician': '电工',
  'cnc-tech': '数控技师',
  'car-repairer': '汽车维修师',
  'interior-designer': '室内装潢师',
  'e-commerce-owner': '跨境电商店主',
  'taobao-owner': '淘宝店主',
  'indie-game-dev': '独立游戏开发者',
  'algo-trader': '算法交易策略师',
  'data-product-mgr': '数据产品经理',
  'growth-hacker': '用户增长黑客',
  'community-op': '社群运营专员',
  'live-op-lead': '直播运营主管',
  'intl-business': '国际商务专员',
  'tech-writer': '技术写作顾问',
  'public-speaker': '自由演讲培训师',
};

const slashMap: Record<string, string[]> = {
  'software-engineer': ['tech-writer', 'indie-game-dev', 'public-speaker'],
    'ai-engineer': ['algo-trader', 'data-product-mgr', 'tech-writer'],
    'product-mgr': ['growth-hacker', 'community-op', 'copywriter'],
    'graphic-designer': ['illustrator', 'photographer', 'short-video-blogger'],
    'psychologist': ['health-lecturer', 'social-worker', 'copywriter'],
    'investment-analyst': ['algo-trader', 'financial-writer', 'cross-border-shop'],
    'lawyer': ['policy-researcher', 'compliance-mgr', 'public-speaker'],
    'electrician': ['car-repairer', 'interior-designer', 'hardware-blogger'],
    'doctor': ['health-lecturer', 'nutritionist', 'public-speaker'],
};

/* 主职业推荐（纯函数） */
export function getMainClassRecommendation(interests: string[]) {
  console.log('【纯函数】计算主职业，interests=', interests);

  const userSkills = interests.filter(id => id.startsWith('s'));
  const userCareer = interests.filter(id => id.startsWith('c'));

  // 1. 技能门槛 ≥ 1
  const skillCounter = new Map<string, number>();
  userSkills.forEach(sId => {
    (interestToMainClass[sId] || []).forEach(job => {
      skillCounter.set(job, (skillCounter.get(job) || 0) + 1);
    });
  });
  const careerCounter = new Map<string, number>();
  userCareer.forEach(sId =>{
    (interestToMainClass[sId] || []).forEach(job => {
        careerCounter.set(job, (careerCounter.get(job) || 0) + 1);
    });
  })

  const qualified = Array.from(new Set([
    ...Array.from(skillCounter.entries()).filter(([, v]) => v >= 1).map(([k]) => k),
    ...Array.from(careerCounter.entries()).filter(([, v]) => v >= 1).map(([k]) => k)
  ]));

  // 2. 兴趣大类加分
  const careerBonus = new Map<string, number>();
  userCareer.forEach(cId => {
    (interestToMainClass[cId] || []).forEach(job => {
      careerBonus.set(job, (careerBonus.get(job) || 0) + 1);
    });
  });

  // 3. 打分 & 排序
  const scored = qualified.map(job => ({
    id: job,
    name: mainClassName[job] || job,
    score:
      (skillCounter.get(job) || 0) * 7 +
      (careerBonus.get(job) || 0) * 7 +
      (rarityBonus[job] || 0) * 3,
  }));
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 6);
}

/* 副职业推荐（纯函数） */
export function getSubClassRecommendation(
    interests: string[],
    mainClassId: string
  ) {
    const userSkills = new Set(interests.filter(id => id.startsWith('s')));
    const userCareer = new Set(interests.filter(id => id.startsWith('c')));
  
    // 1. 全集排除主职业
    const pool = Object.keys(subClassName).filter(id => id !== mainClassId);
  
    // 2. 给每个副职业打分（软匹配）
    type SubItem = { id: string; name: string; score: number };
    const scored: SubItem[] = pool.map(id => {
      const needS = (interestToMainClass[id] || []).filter(iid => iid.startsWith('s'));
      const needC = (interestToMainClass[id] || []).filter(iid => iid.startsWith('c'));
  
      const hitS = needS.filter(s => userSkills.has(s)).length;
      const hitC = needC.filter(c => userCareer.has(c)).length;
      const isSlash = slashMap[mainClassId]?.includes(id) ? 1 : 0;
  
      // 同域分 = 职业命中条数；斜杠分 = 是否斜杠；彩蛋分 = 0
      const sameDomainScore = hitC;
      const slashScore = isSlash * 3; // 斜杠权重可调整
  
      // 总分 = 同域 + 斜杠 + 技能命中（额外微调）
      const totalScore = sameDomainScore + slashScore + hitS;
  
      return { id, name: subClassName[id] || id, score: totalScore };
    });
  
    // 3. 按得分降序 + 同分段随机
    scored.sort((a, b) => b.score - a.score || Math.random() - 0.5);
  
    // 4. 4:2:2 分层采样（高分优先，不足就全拿）
    const pick = (arr: SubItem[], n: number) => arr.slice(0, n);
  
    const sameDomainPool = scored.filter(it => it.score > 0 && !slashMap[mainClassId]?.includes(it.id));
    const slashPool = scored.filter(it => slashMap[mainClassId]?.includes(it.id));
    const eggPool = scored.filter(it => it.score === 0 && !slashMap[mainClassId]?.includes(it.id));
  
    const result = [
      ...pick(sameDomainPool, 4),
      ...pick(slashPool, 2),
      ...pick(eggPool, 2)
    ].map(({ id, name }) => ({ id, name }));
  
    console.log('【副职业】同域池', sameDomainPool, '斜杠池', slashPool, '彩蛋池', eggPool);
    console.log('【副职业】最终返回', result);
    return result;
  }