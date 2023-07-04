import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useContext } from 'react';
import { AppContext } from '../AuthContext';


const PDFReader = ()=>{
    const {activeFile} = useContext(AppContext);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div style={{ width: "70%", height: "100vh" }} >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
                fileUrl={activeFile.working_URL}
                plugins={[
                    defaultLayoutPluginInstance,
                ]}
            />
    </Worker>
        </div>
    )
}

export default PDFReader;

