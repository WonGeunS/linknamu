// TODO: 보여 주기용 더미 데이터입니다. 실제 내용으로 교체하세요.
export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로 또는 외부 URL. 비워 두면 이름 첫 글자로 대체됩니다. */
  imageUrl?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "송개발",
  bio: "풀스택 개발자 : 요즘에는 AI 개발에 관심이 많아요",
  imageUrl: "/profile.jpg",
  links: [
    { id: "github", title: "🐙 GitHub", url: "https://github.com/WonGeunS" },
    { id: "blog", title: "✍️ Blog", url: "https://wg-cy.tistory.com/" },
    { id: "email", title: "📧 Email", url: "mailto:dkrehdr@gmail.com" },
  ],
};
