import React from "react";
import styled, { keyframes } from "styled-components";
import { ShieldCheck, Award, MapPin, ExternalLink, CheckCircle } from "lucide-react";

/* ================= ANIMATIONS ================= */
const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
`;

const floatBadge = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

/* ================= THEME STYLES (MAJINFOTEK) ================= */
const primaryBlue = '#1c3ba4';
const richPurple = '#8b5cf6';
const ThemeGradient = "linear-gradient(135deg, #1c3ba4 0%, #8b5cf6 100%)";
const SoftGradientBg = "linear-gradient(135deg, rgba(28, 59, 164, 0.04) 0%, rgba(139, 92, 246, 0.04) 100%)";
const LightBg = "#f8fafc";
const CardBg = "#ffffff";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";

/* ================= STYLED COMPONENTS ================= */

const DistributorSection = styled.section`
  padding: 6rem 1.5rem;
  background: radial-gradient(circle at center, rgba(139, 92, 246, 0.05), transparent 70%), ${LightBg};
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 48rem;
  margin: 0 auto;

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, rgba(28, 59, 164, 0.1), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 9999px;
    color: ${primaryBlue};
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.25rem;
    box-shadow: 0 4px 15px rgba(28, 59, 164, 0.08);
  }

  h2 {
    font-size: clamp(2.2rem, 4vw, 3rem);
    font-weight: 900;
    color: ${TextPrimary};
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin-bottom: 1rem;

    span {
      background: ${ThemeGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    font-size: 1.1rem;
    color: ${TextMuted};
    line-height: 1.7;
  }
`;

const DistributorCard = styled.div`
  background: ${CardBg};
  border: 1px solid ${BorderColor};
  border-radius: 2.5rem;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -15px rgba(15, 23, 42, 0.07);
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 850px) {
    grid-template-columns: 1fr 1.3fr;
    padding: 3.5rem;
  }

  &:hover {
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 35px 70px -15px rgba(139, 92, 246, 0.18);
    transform: translateY(-4px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: ${ThemeGradient};
  }
`;

const LogoDisplayArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${SoftGradientBg};
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 2rem;
  padding: 3rem 2rem;
  position: relative;
  text-align: center;
  gap: 1.5rem;

  .partner-logo-box {
    width: 110px;
    height: 110px;
    background: #ffffff;
    border-radius: 1.5rem;
    box-shadow: 0 15px 35px rgba(28, 59, 164, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${BorderColor};
    animation: ${floatBadge} 4s ease-in-out infinite;

    span {
      font-size: 2.2rem;
      font-weight: 900;
      background: ${ThemeGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.05em;
    }
  }

  .certification-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 700;
    color: ${primaryBlue};
    border: 1px solid rgba(28, 59, 164, 0.15);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
`;

const InfoContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .tier-tag {
    background: ${ThemeGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  h3 {
    font-size: 2rem;
    font-weight: 800;
    color: ${TextPrimary};
    line-height: 1.25;
    letter-spacing: -0.02em;
    @media (min-width: 768px) { font-size: 2.4rem; }
  }

  p {
    color: ${TextMuted};
    font-size: 1.05rem;
    line-height: 1.7;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 0.5rem 0;

  .meta-item {
    background: #f1f5f9;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .label {
      font-size: 0.75rem;
      font-weight: 600;
      color: ${TextMuted};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .value {
      font-size: 0.95rem;
      font-weight: 800;
      color: ${TextPrimary};
      display: flex;
      align-items: center;
      gap: 0.35s;
    }
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

const VerifyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  border-radius: 9999px;
  background: ${ThemeGradient};
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 10px 25px -4px rgba(139, 92, 246, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  animation: ${pulseGlow} 3s infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -4px rgba(139, 92, 246, 0.6);
    animation: none;
  }
`;

/* ================= COMPONENT EXPORT ================= */

export default function AuthorizedDistributor() {
  return (
    <DistributorSection>
      <SectionWrapper>
        <HeaderContainer>
          <div className="badge-pill">
            <Award className="w-4 h-4 text-purple-600" /> Global Partnership Network
          </div>
          <h2>
            Official Authorized <span>Distributor</span>
          </h2>
          {/* <p>
          Dahua Technology is a global leader in video-centric AIoT solutions that drives digital transformation for cities and enterprises through its Think#2.0 strategy of "Integrated Intelligence." By upgrading public safety, ecological governance, and autonomous operations for cities while strengthening security, productivity, and data-driven decision-making for businesses, the company empowers smarter societies and better living.
           </p> */}
        </HeaderContainer>

        <DistributorCard>
          <LogoDisplayArea>
            <div className="partner-logo-box">
              
              <img src='/dahualogo.png' alt='logo' style={{width:"200px"}}/>
            </div>
            <div className="certification-badge">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Authorized Distributor
            </div>
          </LogoDisplayArea>

          <InfoContentArea>
            <span className="tier-tag">Global Premier Affiliate</span>
            <h3>Dahua Technology</h3>
            <p>
               Dahua Technology is a global leader in video-centric AIoT solutions that drives digital transformation for cities and enterprises through its Think#2.0 strategy of "Integrated Intelligence." By upgrading public safety, ecological governance, and autonomous operations for cities while strengthening security, productivity, and data-driven decision-making for businesses, the company empowers smarter societies and better living.
           </p>

            <MetaGrid>
              {/* <div className="meta-item">
                <span className="label">Authorization ID</span>
                <span className="value">MJ-DIST-9041</span>
              </div> */}
              <div className="meta-item">
                <span className="label">Region Cover</span>
                <span className="value">
                  <MapPin className="w-4 h-4 text-purple-600 inline mr-1" /> International & Local
                </span>
              </div>
            </MetaGrid>

            {/* <ActionWrapper>
              <VerifyButton href="#verify" onClick={(e) => e.preventDefault()}>
                <ShieldCheck className="w-4 h-4" />
                Verify Partnership Certificate
              </VerifyButton>
            </ActionWrapper> */}
          </InfoContentArea>
        </DistributorCard>
      </SectionWrapper>
    </DistributorSection>
  );
}