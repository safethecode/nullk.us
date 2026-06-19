interface CoffeeChatEmailProps {
  meetingType: "remote" | "in-person";
  message: string;
  requestDate: string;
  requesterCompany: string;
  requesterEmail: string;
  requesterName: string;
}

export const CoffeeChatEmail = ({
  requesterName,
  requesterCompany,
  requesterEmail,
  meetingType,
  requestDate,
  message,
}: CoffeeChatEmailProps) => {
  const meetingTypeText = meetingType === "remote" ? "원격" : "대면";
  const previewText = `[삼손] ${requesterName}님이 커피챗을 요청하셨습니다`;

  return (
    <html lang="ko">
      <body style={main}>
        <div style={preview}>{previewText}</div>
        <div style={container}>
          <div style={header}>
            <h1 style={h1}>☕ 커피챗 요청</h1>
          </div>

          <div style={content}>
            <p style={text}>안녕하세요! 새로운 커피챗 요청이 도착했습니다.</p>

            <div style={infoBox}>
              <p style={label}>요청자 정보</p>
              <p style={infoText}>
                <strong>이름:</strong> {requesterName}
              </p>
              <p style={infoText}>
                <strong>소속:</strong> {requesterCompany}
              </p>
              <p style={infoText}>
                <strong>이메일:</strong> {requesterEmail}
              </p>
              <p style={infoText}>
                <strong>미팅 형태:</strong> {meetingTypeText}
              </p>
              <p style={infoText}>
                <strong>요청 일자:</strong> {requestDate}
              </p>
              <p style={infoText}>
                <strong>메시지:</strong> {message}
              </p>
            </div>

            <hr style={hr} />

            <p style={text}>
              요청자와 연락하여 일정을 조율해보세요. 커피챗을 통해 서로의 경험과
              인사이트를 공유할 수 있는 좋은 기회가 될 것입니다.
            </p>

            <div style={buttonContainer}>
              <a
                href={`mailto:${requesterEmail}?subject=커피챗 일정 조율`}
                style={button}
              >
                이메일로 답장하기
              </a>
            </div>
          </div>

          <div style={footer}>
            <p style={footerText}>
              이 이메일은 커피챗 요청 시스템에서 자동으로 발송되었습니다.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

const preview = {
  display: "none",
  fontSize: "1px",
  lineHeight: "1px",
  maxHeight: "0",
  maxWidth: "0",
  opacity: 0,
  overflow: "hidden",
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "64px auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 24px 0",
  textAlign: "center" as const,
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 8px",
  padding: "0",
};

const content = {
  padding: "24px",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const infoBox = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const label = {
  color: "#1f2937",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const infoText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 8px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  border: "none",
  cursor: "pointer",
};

const footer = {
  padding: "0 24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "0",
};

export default CoffeeChatEmail;
