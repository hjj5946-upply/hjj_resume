// 이력서 본문 데이터. 화면 컴포넌트와 분리해 내용 수정 시 이 파일만 보면 되도록 한다.

// 자사: 재직 회사의 서비스·솔루션(고객사 납품 포함) / 외주: 외부 의뢰·프리랜서 / 개인: 사이드 프로젝트
export type ProjectType = "자사" | "외주" | "개인";

// label은 링크의 성격(서비스, 고객사, GitHub, 데모 등)을 짧게 적는다.
export type ProjectLink = { label: string; url: string };

export type Project = {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  techs: string[];
  achievement?: string;
  links?: ProjectLink[];
};

// 기간은 "YYYY-MM" 형식. end가 없으면 재직 중으로 보고, 재직 기간·총 경력은 화면에서 자동 계산한다.
export type Experience = {
  start: string;
  end?: string;
  role: string;
  org: string;
  bullets: string[];
};

export type SkillGroup = { label: string; items: string[] };

// 아래 항목들(학력·자격증·어학·교육)은 비어 있으면 해당 섹션이 화면과 PDF에서 통째로 빠진다.
export type Education = { period: string; school: string; major?: string; status: string };

export type Certification = { date: string; name: string; issuer: string };

export type LanguageScore = { language: string; detail: string; date?: string };

export type Training = { period: string; name: string; org: string; description?: string };

export const PROFILE = {
  nameKo: "홍정준",
  nameEn: "Hong JeongJun",
  // 나이는 화면에서 올해 기준으로 자동 계산한다.
  birthYear: 1993,
  title: "Backend Software Engineer",
  headline: "AI 제품을 빠르게 구현하는 엔지니어, 준입니다.",
  summary: [
    "AI를 활용해 실제 사용되는 제품을 빠르게 만드는 개발자입니다. 단순 기능 구현보다 사용자 경험과 실행 속도를 중요하게 생각하며, LLM·자동화·백엔드 시스템을 조합해 아이디어를 서비스로 연결하는 작업에 집중하고 있습니다.",
    "Java(Spring), Python(FastAPI) 기반으로 개발하며, OpenAI API와 다양한 AI 워크플로우를 활용해 서비스 자동화와 생산성 향상을 구현합니다. 백엔드를 중심으로 필요 시 프론트엔드와 모바일까지 직접 개발합니다.",
  ],
  // 예: "군필 (육군 병장 만기전역, 2014-03 ~ 2015-12)". 비워두면 표시하지 않는다.
  military: "",
  // 상단 요약 줄의 "주요 도메인" 칸
  domain: { value: "물류 · 커머스", detail: "WMS·WCS, 해외 커머스, 상용차 정비" },
};

// PDF로 받은 사람도 최신 웹 버전을 열어볼 수 있도록 이력서에 함께 적는다.
export const RESUME_URL = "https://hjj5946-upply.github.io/hjj_resume/";

export const CONTACT_EMAIL = "hjj5946@gmail.com";

export type PortfolioLink = { label: string; url: string; description: string };

// 이력서 하단 "포트폴리오" 섹션. 프로젝트 링크는 PROJECTS의 links에서 자동으로 모아 함께 보여준다.
export const PORTFOLIO_LINKS: PortfolioLink[] = [
  { label: "GitHub", url: "https://github.com/hjj5946-upply", description: "소스 코드 및 개인 프로젝트 저장소" },
  { label: "웹 이력서", url: RESUME_URL, description: "최신 버전 이력서 (이 문서의 웹 버전)" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/hjj5946-upply",
  linkedin: "https://www.linkedin.com/in/jeongjun-hong-a39049423/",
  instagram: "https://www.instagram.com/pickstudy_vlog/",
};

// 웹 화면에서는 앞에서부터 이 개수만 보여주고 나머지는 "더보기"로 펼친다. PDF에는 전부 나온다.
export const WEB_PREVIEW_PROJECT_COUNT = 3;

export const PROJECTS: Project[] = [
  {
    id: "toel-platform",
    type: "자사",
    name: "TOEL – Overseas Commerce & Logistics Platform",
    description:
      "해외 구매대행·배송대행·역구매대행 서비스를 제공하는 커머스/물류 플랫폼을 제로베이스에서 설계·구축. 해외결제, 배송사 API 연동과 자체 물류 프로세스를 포함한 엔드투엔드 시스템.",
    techs: ["React", "Spring Boot", "JPA", "MySQL", "AWS", "Payment API", "Shipping API"],
    achievement: "월 평균 5,000+ 해외 주문 처리 및 실시간 배송 추적",
    links: [{ label: "서비스", url: "https://btorage.com" }],
  },
  {
    id: "vehicle-service",
    type: "자사",
    name: "Commercial Vehicle Service & Parts System",
    description:
      "벤츠트럭(BENZ), MAN 트럭 등 상용차 제조사의 직영·대리점 정비센터를 위한 정비·부품·재고 관리 시스템. PDI, 정비 이력, SAP 연동 및 부품 WMS를 포함한 엔터프라이즈 백엔드 구축.",
    techs: ["Spring Boot", "SAP", "WMS", "PostgreSQL", "Enterprise System"],
    achievement: "전국 20+ 정비센터 운영 중, 일 평균 200+ 정비 건 처리",
  },
  {
    id: "wms-wcs-automation",
    type: "자사",
    name: "WMS/WCS Automation Solution",
    description:
      "중소·대기업 물류센터에 납품되는 WMS/WCS 솔루션 개발. PAS/DAS/DPS, AGV, 로봇팔 등 자동화 설비 제어와 ERP/SAP 연동을 포함한 물류 코어 시스템.",
    techs: ["C#", "ASP.NET", "MSSQL", "WMS", "WCS", "AGV", "Robot"],
    achievement: "대형 물류센터 5곳 납품, 일 평균 20,000+ 출고 처리",
  },
  {
    id: "pickstudy",
    type: "개인",
    name: "PickStudy",
    description:
      "학원·학생·학부모를 연결하는 통합 관리 플랫폼. 학생용/관리자용 앱과 백엔드를 풀스택으로 설계·구현하고 실시간 위치, 알림, 관리 기능을 포함한 MVP 완성.",
    techs: ["Kotlin", "Jetpack Compose", "FastAPI", "PostgreSQL", "AWS", "React"],
    achievement: "학원 3곳, 학생 100+ 명 관리 MVP 완성 및 운영",
  },
  {
    id: "toel-addon",
    type: "자사",
    name: "TOEL-ADDON – Inventory Automation",
    description:
      "TOEL 솔루션에 현장 프로세스 기반 재고 관리 및 자동화 기능을 추가하여 운영 효율을 개선.",
    techs: ["React", "Spring Boot", "MySQL", "AWS", "WMS"],
    achievement: "재고 처리 시간 40% 단축, 실시간 재고 정확도 98% 달성",
  },
  {
    id: "toel2",
    type: "자사",
    name: "TOEL2 – Payment & Shipping API Integration",
    description:
      "PayPal·Stripe 및 DHL·USPS 등 해외결제/배송사 API를 통합하여 결제·배송 자동화와 실시간 추적 기능 고도화.",
    techs: ["Spring Boot", "Payment API", "Shipping API", "AWS", "Redis", "Kafka", "Jenkins"],
    achievement: "5개 결제사, 7개 배송사 API 연동 및 자동화",
  },
  {
    id: "toel3",
    type: "자사",
    name: "TOEL3 – Open Market Platform",
    description:
      "기존 구매대행 솔루션을 확장한 오픈마켓 플랫폼 MVP. 판매자·상품·정산 구조 설계 및 핵심 기능 구현.",
    techs: ["React", "Spring Boot", "MySQL", "AWS", "Redis", "Kafka", "Jenkins"],
    achievement: "판매자 30+, 상품 1,000+ 등록 가능한 MVP 구축",
  },
  {
    id: "logistics-dashboard",
    type: "자사",
    name: "Logistics Portal & SCM Dashboard",
    description:
      "주문·배송·재고 데이터를 통합 조회하는 물류 포털 및 SCM 대시보드 구축.",
    techs: ["React", "Spring Boot", "Dashboard", "SCM"],
    achievement: "3개 시스템 데이터 실시간 통합, 운영 효율 30% 개선",
  },
  {
    id: "assist-korea-wms",
    type: "자사",
    name: "Assist Korea – WMS Migration",
    description:
      "노후 외주 WMS를 자체 솔루션으로 전환하여 재고 정확도 및 처리 성능을 개선.",
    techs: ["C#", "ASP.NET", "MSSQL", "WMS"],
    achievement: "재고 정확도 85% → 99% 개선, 처리 속도 2배 향상",
    links: [{ label: "고객사", url: "http://assist-korea.co.kr/intro.php?userAgent=PC&" }],
  },
  {
    id: "abc-mart",
    type: "자사",
    name: "ABC Mart – Large-scale WMS/WCS 구축",
    description:
      "대형 물류센터 이전에 맞춰 WMS 재구축 및 PAS·로봇팔 기반 WCS 도입.",
    techs: ["C#", "WMS", "WCS", "Robot", "MSSQL", "RabbitMQ", "Docker"],
    achievement: "일 평균 15,000+ 건 처리, 로봇 자동화로 인건비 50% 절감",
  },
  {
    id: "2p3p",
    type: "자사",
    name: "2PL → 3PL Logistics Transformation",
    description:
      "다중 화주사 대응을 위한 3PL 물류 시스템 확장 및 프로세스 파라미터화.",
    techs: ["ASP.NET", "MSSQL", "3PL", "ERP"],
    achievement: "단일 화주 → 10개 화주사 동시 운영 가능한 시스템 전환",
  },
  {
    id: "jupiter",
    type: "자사",
    name: "Jupiter – WMS Web Migration",
    description:
      "레거시 Windows 기반 WMS를 웹 기반으로 재구축하여 유지보수성과 확장성 확보.",
    techs: ["ASP.NET", "MSSQL", "WMS", "RabbitMQ"],
    achievement: "Windows 클라이언트 → 웹 마이그레이션, 유지보수 비용 60% 절감",
  },
  {
    id: "covid-sollog",
    type: "외주",
    name: "COVID-SOLLOG",
    description:
      "열화상 카메라 기반 체온 측정 및 출입 관리 태블릿 서비스.",
    techs: ["Python", "React", "MySQL", "Redis"],
    achievement: "1개월 내 프로토타입 → 상용 서비스 론칭",
  },
  {
    id: "jgamebox",
    type: "개인",
    name: "J GameBox",
    description:
      "웹 기반 미니 게임 포털 서비스. 간단한 게임을 빠르게 즐길 수 있는 PWA 스타일 플랫폼.",
    techs: ["React", "TypeScript", "Vite", "Tailwind"],
    achievement: "개인 프로젝트, PWA 기반 오프라인 플레이 지원",
    links: [{ label: "서비스", url: "https://jun-gamebox.com" }],
  },
  {
    id: "elfin",
    type: "외주",
    name: "Elfin – Women's Shopping Mall SaaS",
    description:
      "여성 패션 쇼핑몰을 위한 사용자 웹사이트 및 관리자 페이지를 1인 개발한 SaaS 형태의 서비스. 반응형 UI 기반으로 상품·주문·운영 관리 기능을 구현하고, Supabase를 활용한 데이터 관리 및 ECS 기반 배포 환경 구축.",
    techs: ["React", "Responsive Web", "Supabase", "ECS", "SaaS"],
    achievement: "1인 풀스택 개발, 기획부터 배포까지 3개월 완성",
    // links: [{ label: "서비스", url: "https://elfin.co.kr" }],
  },
  {
    id: "account",
    type: "개인",
    name: "씀씀이 기록",
    description:
      "개인 지출 패턴을 태그와 그래프로 시각화한 PWA 기반 개인 재무 관리 웹 서비스. 오프라인 사용을 지원하며, 카테고리별 분석과 정기 지출 관리 기능을 구현.",
    techs: ["React", "TypeScript", "PWA", "Data Visualization"],
    achievement: "개인 프로젝트, PWA + 오프라인 지원 구현",
    links: [{ label: "웹 앱", url: "https://hjj5946-upply.github.io/actbook/lock" }],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Backend / API",
    items: [
      "Java (Spring Boot)",
      "Python (FastAPI)",
      "C# (ASP.NET)",
      // "RabbitMQ",
      "Kafka",
    ],
  },
  {
    label: "Frontend / UI",
    items: [
      "React",
      "TypeScript",
      // "Vite",
      // "Tailwind CSS",
      "GSAP",
    ],
  },
  { label: "Mobile", items: ["Android (Flutter(Dart))"] },
  {
    label: "Infra / DevOps",
    items: ["AWS (EC2/RDS)", "Docker", "Jenkins", "CI/CD", "Vercel", "Firebase"],
  },
  {
    label: "Data / Storage",
    items: [
      "PostgreSQL",
      "MySQL",
      // "MSSQL",
      // "MariaDB",
      "Redis",
      "Supabase",
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    start: "2025-10",
    role: "Backend Engineer",
    org: "Commercial Vehicle Service & Parts System",
    bullets: [
      "벤츠트럭(BENZ Truck), MAN 트럭 등 상용차 제조사의 직영·대리점 서비스 정비센터를 위한 정비 시스템 구축 및 운영",
      "차량 입고부터 PDI, 정비 이력 관리까지 정비 전 과정을 관리하는 백엔드 시스템 설계·구현",
      "정비 시스템 내 SAP 연동을 통한 부품, 비용, 환율 기반 관리 로직 개발",
      "차량 부품 WMS 시스템 구축 및 재고 흐름 관리 기능 구현",
      "운영 중인 상용 시스템의 유지보수 및 안정화 작업 수행",
    ],
  },
  {
    start: "2022-01",
    end: "2025-09",
    role: "Backend Engineer / Full-Stack Engineer",
    org: "Overseas Commerce & Logistics Platform",
    bullets: [
      "해외 구매대행·배송대행·역구매대행 서비스를 제공하는 커머스/물류 플랫폼을 백지 상태에서 설계·구축",
      "해외 결제 API, 배송사 API 연동을 포함한 주문·결제·배송 전체 흐름의 백엔드 시스템 개발",
      "외부 쇼핑몰이 자사 API 버튼을 통해 구매대행 및 장바구니 기능을 사용할 수 있는 연동 구조 설계",
      "내부 운영을 위한 경량 WMS 형태의 재고 관리 시스템 구축 및 운영",
      "안드로이드 앱 개발에 직접 참여하여 서비스 기능 구현 및 운영 지원",
    ],
  },
  {
    start: "2018-01",
    end: "2021-11",
    role: "Web / Backend Engineer",
    org: "WMS/WCS Core Solution",
    bullets: [
      "중소·대기업 및 화주사 물류센터에 납품되는 WMS 솔루션 설계·개발 및 유지보수",
      "PAS/DAS/DPS 등 WCS 피킹·분배 시스템 구현 및 설비 제어 로직 개발, 현장 연동 및 안정화",
      "AGV, 로봇팔 등 자동화 설비와 연계된 물류 프로세스 구축 및 운영 지원",
      "ERP·SAP 등 외부 시스템과의 데이터 연동 및 인터페이스 개발",
      "내부 SCM 물류 포털 및 MES 시스템 개발·운영",
    ],
  },
];

// 최신 학력이 맨 앞. 첫 항목이 상단 요약의 "최종학력"으로 쓰인다.
// 예: { period: "2011-03 ~ 2017-02", school: "OO대학교", major: "컴퓨터공학과", status: "졸업" }
export const EDUCATION: Education[] = [{ period: "2019 ~ 2023", school: "광운대학교", status: "졸업" }];

// 예: { date: "2017-11", name: "정보처리기사", issuer: "한국산업인력공단" }
export const CERTIFICATIONS: Certification[] = [];

// 예: { language: "영어", detail: "TOEIC 850", date: "2023-05" }
export const LANGUAGES: LanguageScore[] = [];

// 부트캠프·사내외 교육 등. 예: { period: "2017-07 ~ 2017-12", name: "OO 과정", org: "OO아카데미" }
export const TRAININGS: Training[] = [];
