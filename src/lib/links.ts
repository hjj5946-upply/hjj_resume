// 인쇄물에서도 주소가 보이도록 링크 텍스트는 프로토콜·www·쿼리를 뗀 URL로 보여준다.
export function toLinkLabel(url: string) {
  const { host, pathname } = new URL(url);
  return (host.replace(/^www\./, "") + pathname).replace(/\/$/, "");
}
