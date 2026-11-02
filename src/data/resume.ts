// 이력서 본문 데이터. 화면 컴포넌트와 분리해 내용 수정 시 이 파일만 보면 되도록 한다.

// 자사: 재직 회사의 서비스·솔루션 / 외주: 외부 의뢰·프리랜서 / 개인: 사이드 프로젝트
export type ProjectType = "자사" | "외주" | "개인";

// label은 링크의 성격(서비스, 홈페이지, GitHub, 데모 등)을 짧게 적는다.
export type ProjectLink = { label: string; url: string };

export type Project = {
  id: string;
  name: string;
  type: ProjectType;
  // 표기용 기간 문자열(예: "2022.07 ~ 2025.08", 진행 중이면 "2025.10 ~" 또는 "2025.10 ~ 현직").
  period: string;
  // 기간 뒤에 " · "로 붙는 짧은 상태 표시(예: "오픈 준비 중").
  status?: string;
  // 값이 있는 프로젝트 앞에 그룹 소제목을 띄운다(그룹의 첫 프로젝트에만 적는다).
  group?: string;
  description: string;
  techs: string[];
  // 성과 줄. 값이 없으면 줄 자체를 렌더링하지 않는다.
  achievement?: string;
  links?: ProjectLink[];
  // 하단 포트폴리오 섹션에 표시할 이름(서비스 브랜드명)과 한 줄 설명.
  // 없으면 이름은 프로젝트명 앞부분, 설명은 링크 label을 쓴다.
  portfolioName?: string;
  portfolioDescription?: string;
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
  headline: "AI 에이전트로 제품을 만들고 운영까지 잇는 엔지니어, 준입니다.",
  summary: [
    "예전에는 개발 속도가 코드를 치는 속도였다면, 지금은 AI에게 무엇을 어떻게 시키고 결과를 얼마나 정확히 검증하느냐가 속도를 결정한다고 생각합니다. 저는 AI 에이전트와 MCP로 개발 하네스를 구조화해, 저장소 분석부터 구현·테스트·수정까지 반복하며 랜딩 페이지, 웹, 모바일 앱, 사내 관리 시스템을 1인으로 만들어 운영 단계까지 연결해 왔습니다.",
    "빠르게 만든 제품에서 놓치기 쉬운 보안의 빈틈도 함께 보완합니다. 9년의 백엔드·운영 경험이 있어 AI가 만든 결과의 구조와 품질을 직접 판단할 수 있고, 다양한 AI 도구를 업무에 적용하며 일하는 방식을 계속 개선하고 있습니다.",
  ],
};

// 개인정보 노출 설정. 항목별로 true/false만 바꾸면 웹 화면과 PDF에 함께 반영된다.
export const PRIVACY = {
  showPhoto: true, // 프로필 사진
  showAge: true, // 이름 옆 나이
  showLinkedIn: true, // 상단 연락처와 하단 아이콘의 LinkedIn
  showVeteranDisability: true, // 병역·취업우대사항의 보훈 대상·장애 줄
};

// 병역·취업우대사항(보훈·장애 등). 학력 아래 별도 섹션으로 표시하고, 비우면 섹션이 빠진다.
export const ADDITIONAL_INFO: { label: string; value: string }[] = [
  { label: "병역", value: "육군 (병장 만기전역, 2013.12 ~ 2015.09)" },
  ...(PRIVACY.showVeteranDisability
    ? [
        { label: "보훈 대상", value: "비대상" },
        { label: "장애", value: "비대상" },
      ]
    : []),
];

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
  // ── 그룹 A. 주요 프로젝트 ──
  {
    id: "vehicle-service",
    group: "주요 프로젝트",
    type: "자사",
    name: "상용차 정비·부품 관리 시스템 운영·확장",
    period: "2025.10 ~ 현직",
    description:
      "글로벌 상용차 제조사의 직영·대리점 정비센터와 본사가 사용하는 정비·부품·재고 관리 시스템에 합류해 운영·확장. 센터와 본사의 요청에 따른 추가 개발과 유지보수, 정비·금액(회계) 데이터의 SAP 연동 로직 개발, 데이터 확인 업무를 담당.",
    techs: ["Spring Boot", "SAP", "WMS", "PostgreSQL"],
  },
  {
    id: "autofocus",
    type: "자사",
    name: "전사관리시스템(ERP)·기업 홈페이지 리뉴얼",
    period: "2026 ~ 현직",
    description:
      "레거시 기업 홈페이지를 리뉴얼하고, 문의 접수·영업(Sales) 관리·사내 회계·매출을 다루는 전사관리시스템을 구축해 운영 중(초기 단계, 지속 개선). 서버·인프라 구성과 개발·구축을 담당(기획·디자인 제외). SaaS·PaaS 기반으로 빠르게 현대화해 사내 업무와 재무회계 관리의 편의성을 높임.",
    techs: ["React", "Python", "Supabase", "Railway"],
    links: [{ label: "홈페이지", url: "https://autofocushub.com/" }],
    portfolioName: "Autofocus",
    portfolioDescription: "기업 홈페이지 리뉴얼 · 전사관리시스템(ERP)",
  },
  {
    id: "toel-platform",
    type: "자사",
    name: "해외 구매·배송대행 플랫폼(TOEL) 구축·운영",
    period: "2022.07 ~ 2025.08",
    description:
      "성능과 노후 기술, 유지·개선 대응에 한계가 있던 외주 웹 솔루션을 대체해, 구매·배송대행 플랫폼(고객 웹·앱, 관리자 웹)을 자사 기획으로 새로 구축. 2인 팀의 주 담당으로 기획·설계·구현을 총괄. PayPal·위챗 결제와 FedEx·UPS·우체국(EMS) 배송을 연동하고, 고객 물류 단계 알림으로 수동 업무와 실수를 줄임. 금액·무게 계산 자동화로 현장 입출고 처리 시간과 인력 비용을 줄이고, 주문→결제 소요 시간을 5초 이상 단축. 신규 시스템 전환 후 신규 고객 유입이 늘어 매출 25% 상승. 외부 쇼핑몰용 오픈 API와 오픈마켓을 운영(월 200~300건 출고). 물류 포털·관리자 대시보드와 고객용 안드로이드 앱(UI/UX·주문·결제 연동)도 담당.",
    techs: ["React", "Spring Boot", "JPA", "MySQL", "AWS", "Redis", "Kafka", "Jenkins"],
    links: [{ label: "서비스", url: "https://btorage.com/" }],
    portfolioName: "Btorage",
    portfolioDescription: "해외 구매·배송대행 플랫폼",
  },
  {
    id: "wms-web-migration",
    type: "자사",
    name: "레거시 Windows WMS의 웹 전환",
    period: "2019 ~ 2020",
    description:
      "노후화된 Windows 기반 WMS를 웹 기반으로 전환. 약 8천만~1.5억 건 규모의 데이터 마이그레이션과 재고·입출고 프로세스 화면 모듈 개발 담당.",
    techs: ["ASP.NET", "MSSQL", "RabbitMQ"],
  },
  {
    id: "wms-das",
    type: "자사",
    name: "대형 물류센터 WMS 유지관리·DAS 추가 구축",
    period: "2021",
    description:
      "운영 중인 대형 3PL 물류센터에서 WMS 유지관리, DAS 추가 구축·관리, AGV·PAS 설비 유지관리 담당.",
    techs: ["C#", "WMS", "WCS", "MSSQL"],
  },
  {
    id: "2pl-3pl",
    type: "자사",
    name: "다중 화주사 WMS 확장 (2PL → 3PL)",
    period: "2020",
    description:
      "30곳 이상의 화주사가 이용하는 WMS를 3PL 운영에 맞춰 확장 개발. 확장 후 화주사 수가 더 늘어난 시스템.",
    techs: ["ASP.NET", "MSSQL"],
  },
  {
    id: "thermal-attendance",
    type: "자사",
    name: "열화상 체온·출석 관리 시스템",
    period: "2020",
    description:
      "얼굴 인식 체온 측정·출석 데이터를 수신해 관리하고 알림을 제공하는 시스템. 전국 일부 스터디카페에서 사용.",
    techs: ["Python", "React", "MySQL", "Redis"],
  },

  // ── 그룹 B. 외주·개인 프로젝트 ──
  {
    id: "fashion-mall",
    group: "외주·개인 프로젝트",
    type: "외주",
    name: "여성 패션몰 구축",
    period: "2018",
    description: "카페24 기반 여성 패션 쇼핑몰의 쇼핑몰 사이트, 관리자 페이지, 결제 연동을 1인 구현.",
    techs: ["Cafe24", "React", "Java", "Spring Boot", "Git"],
  },
  {
    id: "barojajae",
    type: "외주",
    name: "건설 자재 발주 플랫폼",
    period: "2025.10 ~ 2026.05",
    status: "오픈 준비 중",
    description:
      "의뢰 회사를 위해 랜딩 페이지, 플랫폼 웹, 사내 관리 시스템, 발주·결제 모듈과 프로세스를 1인 총괄 개발. 오픈 준비 중.",
    techs: ["React", "Python", "PostgreSQL", "Redis", "Supabase", "Fly.io", "Cloudflare"],
    links: [{ label: "서비스", url: "https://barojajae.com/" }],
    portfolioName: "바로자재",
    portfolioDescription: "건설 자재 발주 플랫폼 · 랜딩 페이지 · 사내 관리 시스템",
  },
  {
    id: "bareunireum",
    type: "개인",
    name: "사주·성명학 기반 작명 서비스",
    period: "2026",
    description: "사주·성명학 기반으로 신생아 작명·개명을 추천하는 서비스를 직접 기획·개발해 운영.",
    techs: ["React", "Next.js", "Supabase", "Vercel", "Cloudflare"],
    links: [{ label: "서비스", url: "https://www.bareunireum.com/" }],
    portfolioName: "바른이름",
    portfolioDescription: "사주·성명학 기반 작명·개명 서비스",
  },
  {
    id: "pickstudy",
    type: "개인",
    name: "학원 통합 관리 플랫폼",
    period: "2026.01 ~",
    status: "오픈 준비 중",
    description:
      "학원·학생·학부모를 연결하는 통합 관리 플랫폼. 학생용·관리자용 앱과 백엔드를 1인 설계·구현. 웹은 공개, 앱은 배포 준비 중.",
    techs: ["Flutter(Dart)", "FastAPI", "PostgreSQL", "AWS", "React"],
    links: [{ label: "서비스", url: "https://pickstudy.app/" }],
    portfolioName: "픽스터디",
    portfolioDescription: "학원·학생·학부모 통합 관리 플랫폼",
  },
  {
    id: "jgamebox",
    type: "개인",
    name: "웹 게임 포털(J GameBox)",
    period: "2025 ~",
    description: "간단한 무료 웹 게임 사이트. PWA 기반으로 구성해 운영 중(소규모).",
    techs: ["React", "TypeScript", "Vite", "Tailwind"],
    links: [{ label: "서비스", url: "https://jun-gamebox.com/" }],
    portfolioName: "J GameBox",
    portfolioDescription: "무료 웹 게임 사이트",
  },
];

// 프로젝트 섹션 맨 끝에 붙는 안내 문구. 비우면 렌더링하지 않는다.
export const PROJECTS_NOTE =
  "※ 사내·관리자·납품형 시스템은 보안상 URL을 공개하지 않으며, 면접에서 구조와 담당 범위를 설명드릴 수 있습니다.";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Backend / API",
    items: ["Java (Spring Boot, JPA)", "Python (FastAPI)", "C# (ASP.NET)", "Kafka", "RabbitMQ"],
  },
  { label: "Frontend / UI", items: ["React", "Next.js", "TypeScript"] },
  { label: "Mobile", items: ["Flutter (Dart)", "Android"] },
  { label: "Database", items: ["PostgreSQL", "MySQL", "MSSQL", "Redis", "Supabase"] },
  {
    label: "Infra / DevOps",
    items: ["AWS (EC2/RDS)", "Docker", "Jenkins", "CI/CD", "Vercel", "Cloudflare", "Fly.io", "Railway"],
  },
  {
    label: "Integration",
    items: ["SAP 연동", "WMS·WCS", "결제·배송사 API (PayPal, 위챗, FedEx, UPS, 우체국)"],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    start: "2025-10",
    role: "Backend Engineer",
    org: "Commercial Vehicle Service & Parts System",
    bullets: [
      "글로벌 상용차 제조사의 직영·대리점 정비센터와 본사가 사용하는 정비·부품·재고 관리 시스템에 합류해 운영·확장",
      "센터·본사 요청에 따른 추가 개발 및 유지보수",
      "정비·금액(회계) 데이터의 SAP 연동 로직 개발, 부품 WMS 재고 흐름 기능 개발",
      "전사관리시스템(ERP)·기업 홈페이지 리뉴얼의 서버·인프라 구성, 개발, 구축 담당(기획·디자인 제외)",
    ],
  },
  {
    start: "2022-01",
    end: "2025-09",
    role: "Backend Engineer / Full-Stack Engineer",
    org: "Overseas Commerce & Logistics Platform",
    bullets: [
      "해외 구매대행·배송대행·역구매대행 플랫폼(고객 웹·앱, 관리자 웹)을 2인 팀의 주 담당으로 기획·설계·구현 총괄",
      "해외 결제(PayPal·위챗)와 배송사(FedEx·UPS·우체국 EMS) 연동, 주문·결제·배송 전 흐름의 백엔드 개발",
      "금액·무게 계산 자동화와 고객 물류 단계 알림 구현",
      "외부 쇼핑몰용 오픈 API 제공, 판매자 참여 오픈마켓 오픈·운영",
      "물류 포털·관리자 대시보드, 내부 운영용 경량 WMS 형태 재고 관리 시스템, 고객용 안드로이드 앱 개발",
    ],
  },
  {
    start: "2017-06",
    end: "2021-11",
    role: "Web / Backend Engineer",
    org: "WMS/WCS Core Solution",
    bullets: [
      "대형 3PL 물류센터 고객사에 납품·운영되는 WMS 솔루션의 설계·개발 및 유지보수",
      "노후 Windows WMS의 웹 전환(데이터 마이그레이션, 재고·입출고 화면 모듈), 30곳 이상 화주사를 위한 3PL 확장 개발",
      "운영 중인 센터의 WMS 유지관리, DAS 추가 구축·관리, AGV·PAS 설비 유지관리",
      "ERP·SAP 등 외부 시스템과의 데이터 연동·인터페이스 개발",
      "물류센터와 자사가 쓰던 SCM 물류 포털·MES 웹 프로그램의 화면 구성·개발·배포 담당(서버 구성 제외)",
    ],
  },
];

// 최신 학력이 맨 앞. 첫 항목이 상단 요약의 "최종학력"으로 쓰인다.
// 예: { period: "2011-03 ~ 2017-02", school: "OO대학교", major: "컴퓨터공학과", status: "졸업" }
export const EDUCATION: Education[] = [
  { period: "2019 ~ 2023", school: "광운대학교", status: "졸업" },
  { period: "2009 ~ 2012", school: "하남경영고등학교", status: "졸업" },
];

// 예: { date: "2017-11", name: "정보처리기사", issuer: "한국산업인력공단" }
export const CERTIFICATIONS: Certification[] = [];

// 예: { language: "영어", detail: "TOEIC 850", date: "2023-05" }
export const LANGUAGES: LanguageScore[] = [];

// 부트캠프·사내외 교육 등. 예: { period: "2017-07 ~ 2017-12", name: "OO 과정", org: "OO아카데미" }
export const TRAININGS: Training[] = [];
