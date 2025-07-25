import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow-x: hidden;
  &::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.32;
    background-image: url('data:image/svg+xml;utf8,<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="60" x2="60" y2="0" stroke="%2390a4c8" stroke-width="2.2"/><line x1="-20" y1="60" x2="60" y2="-20" stroke="%2390a4c8" stroke-width="2.2"/><line x1="0" y1="80" x2="80" y2="0" stroke="%2390a4c8" stroke-width="2.2"/></svg>');
    background-repeat: repeat;
    background-size: 60px 60px;
  }
  > * {
    position: relative;
    z-index: 1;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 1.5rem 0;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 4px 24px rgba(0,0,0,0.04);
  margin-bottom: 2.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  padding: 0.7rem 2.2rem;
  border-radius: 12px;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  &:hover {
    background: #e3f0ff;
    color: #125ea2;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 1300px;
  background: rgba(255,255,255,0.98);
  border-radius: 32px;
  box-shadow: 0 8px 40px rgba(25, 118, 210, 0.10), 0 1.5px 8px rgba(0,0,0,0.04);
  padding: 3.5rem 3vw 2.5rem 3vw;
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1200px) {
    max-width: 98vw;
    padding: 2rem 1vw;
    border-radius: 18px;
  }
`;

const Title = styled.h1`
  font-size: 2.6rem;
  margin-bottom: 2.2rem;
  color: #1a237e;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-align: center;
`;

const DropZone = styled.div<{isDragActive: boolean}>`
  border: 2.5px dashed #1976d2;
  border-radius: 20px;
  padding: 3.5rem 2rem;
  text-align: center;
  background: ${(props) => props.isDragActive ? '#e3f0ff' : '#f4f8fd'};
  cursor: pointer;
  margin-bottom: 2.2rem;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 16px rgba(25, 118, 210, 0.07);
  outline: none;
  &:hover, &:focus {
    border-color: #125ea2;
    background: #e3f0ff;
    box-shadow: 0 4px 24px rgba(25, 118, 210, 0.13);
  }
`;

const SampleImage = styled.img`
  width: 420px;
  margin-top: 1.2rem;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.13);
  border: 2px solid #e3f0ff;
  transition: transform 0.18s, box-shadow 0.18s;
  &:hover {
    transform: scale(1.04) rotate(-1deg);
    box-shadow: 0 8px 32px rgba(25, 118, 210, 0.18);
    border-color: #1976d2;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #1976d2 60%, #64b5f6 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 1rem 2.2rem;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.10);
  transition: background 0.18s, box-shadow 0.18s, transform 0.13s;
  &:hover {
    background: linear-gradient(90deg, #125ea2 60%, #1976d2 100%);
    box-shadow: 0 4px 24px rgba(25, 118, 210, 0.18);
    transform: translateY(-2px) scale(1.03);
  }
  &:disabled {
    background: #b0bec5;
    color: #eee;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ResultBox = styled.div`
  background: #e3f0ff;
  border-radius: 16px;
  padding: 1.5rem 1.2rem;
  margin-top: 2.2rem;
  text-align: center;
  font-size: 1.25rem;
  color: #1a237e;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.10);
`;

const ErrorBox = styled.div`
  background: #ffe3e3;
  color: #b71c1c;
  border-radius: 16px;
  padding: 1.5rem 1.2rem;
  margin-top: 2.2rem;
  text-align: center;
  font-size: 1.15rem;
  box-shadow: 0 2px 12px rgba(183, 28, 28, 0.10);
`;

const Loader = styled.div`
  margin-top: 2.2rem;
  text-align: center;
  font-size: 1.15rem;
  color: #1976d2;
`;

const SampleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.07);
  padding: 1.5rem 2.5rem 1.2rem 2.5rem;
  max-width: 600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const SampleLabel = styled.div`
  margin-top: 1rem;
  background: #e3f0ff;
  color: #1976d2;
  font-weight: 600;
  font-size: 1.08rem;
  border-radius: 8px;
  padding: 0.4rem 1.1rem;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.08);
`;

const SampleCaption = styled.div`
  margin-top: 0.7rem;
  color: #888;
  font-size: 0.98rem;
  text-align: center;
`;

const LearnGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  margin: 2.5rem auto 3.5rem auto;
  gap: 2.2rem 0;
  align-items: center;
  @media (max-width: 900px) {
    max-width: 98vw;
    gap: 1.5rem 0;
  }
`;

const LearnRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2.2rem;
  justify-content: center;
  align-items: stretch;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem 0;
  }
`;

const LearnBox = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 16px rgba(25, 118, 210, 0.08);
  padding: 2.2rem 2rem 2.2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 190px;
  position: relative;
  width: 100%;
  flex: 1 1 0;
  max-width: 100%;
`;

const ClassificationHeader = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: #1976d2;
  margin-bottom: 1.1rem;
  margin-left: 0.2rem;
  letter-spacing: 0.01em;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 0.7rem;
  top: 2.7rem;
  bottom: 1.7rem;
  width: 4px;
  border-radius: 2px;
  background: linear-gradient(180deg, #1976d2 60%, #64b5f6 100%);
`;

const BulletList = styled.ul`
  list-style: none;
  margin: 0 0 0 1.7rem;
  padding: 0;
`;

const Bullet = styled.li`
  position: relative;
  font-size: 1.08rem;
  color: #333;
  margin-bottom: 0.7rem;
  padding-left: 1.2rem;
  &:before {
    content: '';
    position: absolute;
    left: -1.2rem;
    top: 0.55rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: linear-gradient(120deg, #1976d2 60%, #64b5f6 100%);
    box-shadow: 0 1px 4px rgba(25, 118, 210, 0.10);
  }
`;

const LearnImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex: 1 1 0;
  max-width: 100%;
`;

const LearnImage = styled.img`
  width: 100%;
  height: 260px;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.13);
  margin-bottom: 1.1rem;
  background: #f4f8fd;
  object-fit: cover;
  display: block;
`;

const LearnImageCaption = styled.div`
  text-align: center;
  color: #1976d2;
  font-size: 1.02rem;
  font-weight: 500;
`;

const learnRows = [
  {
    header: 'Implant',
    bullets: [
      'An implant is a small titanium post surgically placed into the jawbone to replace the root of a missing tooth',
      'It provides a strong foundation for a crown, bridge, or denture, functioning and looking like a natural tooth, fusing with the bone over time',
      'This can be identified as a bright, screw-like structure embedded in the jawbone, distinct from natural teeth due to its metallic density',
    ],
    image: `${process.env.PUBLIC_URL}/implant-example.jpg`,
    caption: 'Implant Example',
  },
  {
    header: 'Filling',
    bullets: [
      'A dental filling is a restorative material used to repair a tooth damaged by decay or minor fractures.',
      'It restores the tooth’s shape, function, and integrity after the decayed portion is removed.',
      'Filling material appears as a distinct, well-defined area brighter than the surrounding tooth structure, especially if made of metal',
    ],
    image: `${process.env.PUBLIC_URL}/filling-example.jpg`,
    caption: 'Filling Example',
  },
  {
    header: 'Cavity',
    bullets: [
      'A cavity, also known as dental caries or tooth decay, is permanent damage to the hard surface of a tooth caused by bacterial acids.',
      'It creates holes or soft spots in the enamel that can grow deeper over time if untreated, and result from poor oral hygiene or diet.',
      'Cavities appear as a slightly darker area within the enamel, indicating loss of mineral density compared to healthy tooth structure'
    ],
    image: `${process.env.PUBLIC_URL}/cavity-example.jpg`,
    caption: 'Cavity Example',
  },
  {
    header: 'Impacted Tooth',
    bullets: [
      'An impacted tooth is one that fails to fully erupt in the mouth due to being blocked by other teeth, bone, or tissue.',
      'This most commonly occurs with wisdom teeth (shown in image) and can lead to pain, swelling, or infection if left untreated.',
      'Generally, this appears as a tooth positioned abnormally or trapped beneath the gum or bone, pushing against adjacent teeth',
    ],
    image: `${process.env.PUBLIC_URL}/impacted-tooth-example.webp`,
    caption: 'Impacted Tooth Example',
  },
];

const LearnPage = () => (
  <Main>
    <Title>Learn About Dental X-Ray Classification</Title>
    <LearnGrid>
      {learnRows.map((row, i) => (
        <LearnRow key={i}>
          <LearnBox style={{overflow:'visible'}}>
            <ClassificationHeader>{row.header}</ClassificationHeader>
            <VerticalLine />
            <BulletList>
              {row.bullets.map((b, j) => (
                <Bullet key={j}>{b}</Bullet>
              ))}
            </BulletList>
          </LearnBox>
          <LearnBox as={LearnImageBox} style={{alignItems:'center', justifyContent:'center'}}>
            <LearnImage src={row.image} alt={row.caption} />
            <LearnImageCaption>{row.caption}</LearnImageCaption>
          </LearnBox>
        </LearnRow>
      ))}
    </LearnGrid>
    <StyledLink to="/">&#8592; Back to Upload</StyledLink>
  </Main>
);

const UploadPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<{prediction: string, confidence: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  // Remove drag logic for sample image, use click to select instead
  const handleSampleClick = async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/sample-xray.jpg`);
    const blob = await response.blob();
    const file = new File([blob], 'sample-xray.jpg', { type: blob.type });
    setSelectedFile(file);
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      // Change the URL below to your Flask backend endpoint
      console.log("📡 About to POST to:", "/predict");
      const response = await fetch("/predict", {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Server error.');
      const data = await response.json();
      setResult({ prediction: data.prediction, confidence: data.confidence });
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return (
    <>
      <Main>
        <Title>DentalX AI</Title>
        <DropZone
          isDragActive={dragActive}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{ minHeight: 160 }}
        >
          {selectedFile ? (
            <>
              <div><strong>Selected:</strong> {selectedFile.name}</div>
              <Button onClick={handleUpload} disabled={loading} style={{marginTop: 16}}>
                 {loading ? 'Uploading...' : 'Upload & Classify'}
              </Button>
              <Button onClick={handleReset} style={{marginLeft: 12, background: '#eee', color: '#333'}} disabled={loading}>
                Choose Another
              </Button>
            </>
          ) : (
            <>
              <div>Drag & drop a panoramic dental X-ray image here,<br/>or <span style={{color:'#1976d2', textDecoration:'underline', cursor:'pointer'}}>click to select</span> a file.</div>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={handleFileChange}
              />
              <div style={{marginTop: 18, fontSize: '0.95rem', color: '#888'}}>Or use the sample image below.</div>
            </>
          )}
        </DropZone>
        {loading && <Loader>Processing image...</Loader>}
        {error && <ErrorBox>{error}</ErrorBox>}
        {result && (
          <ResultBox>
             <div style={{fontSize:'1.3rem', marginBottom:8}}><strong>Classification:</strong> {result.prediction}</div>
            <div style={{fontSize:'1.0rem'}}><strong>Confidence:</strong> {(((0.5 * result.confidence) + 0.5) * 100).toFixed(2)}%</div>
          </ResultBox>
        )}
      </Main>
      <SampleBox>
        <SampleImage
          src={`${process.env.PUBLIC_URL}/sample-xray.jpg`}
          alt="Sample Dental X-ray"
          style={{cursor:'pointer'}}
          onClick={handleSampleClick}
        />
        <SampleLabel>Classification: Cavity</SampleLabel>
        <SampleCaption>Click the image to use it as a sample, or drag and drop your own image above.</SampleCaption>
      </SampleBox>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <Container>
      <Nav>
        <NavLinks>
          <StyledLink to="/">Upload</StyledLink>
          <StyledLink to="/learn">Learn</StyledLink>
        </NavLinks>
      </Nav>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </Container>
  </Router>
);

export default App;
