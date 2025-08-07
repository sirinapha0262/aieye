import { useState } from 'react';
import EyeDiseaseUploader from './components/EyeDiseaseUploader';
import './App.css';
import { School, Info } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b-4 border-green-400 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-400 rounded-lg flex items-center justify-center">
                <School className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-green-800">
                  AI ตรวจจับโรคตา
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Eye Disease Detection System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Title Section */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-center shadow-sm border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
            ปัญญาประดิษฐ์สำหรับตรวจวิเคราะห์โรคตา
          </h2>
          <p className="text-blue-600 text-sm sm:text-base font-medium mb-2 sm:mb-3">
            Eye Disease Detection System
          </p>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            อัปโหลดรูปภาพดวงตาเพื่อตรวจสอบภาวะต่างๆ ครบ 10 ประเภท ได้แก่ ต้อหิน จอตาเสื่อมจากเบาหวาน จอตาลอก สายตาสั้น เนื้องอกตาปลา รอยแผลเป็นที่จุดเหี่ยง จานประสาทตาบวม โรคจอตาชั้นกลางบวม จอตาเสื่อมทางพันธุกรรม และสภาพปกติ
          </p>
        </div>

        {/* Upload Component */}
        <div className="px-0 sm:px-2">
          <EyeDiseaseUploader />
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-6 sm:mt-8">
          <div className="flex items-start gap-2 sm:gap-3">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-blue-800">
              <strong>หมายเหตุ:</strong> ผลลัพธ์จากระบบนี้เป็นเพียงข้อมูลเบื้องต้นเท่านั้น 
              ไม่สามารถใช้เป็นการวินิจฉัยทางการแพทย์ได้ กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อการตรวจวินิจฉัยที่แม่นยำ
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-400 text-white py-4 sm:py-6 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="font-medium text-sm sm:text-base mb-1">
            © {new Date().getFullYear()} AI ตรวจจับโรคตา
          </p>
          <p className="text-green-100 text-xs sm:text-sm">
            วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตสกลนคร
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;