// composables/usePDF.ts
// Company Profile PDF + Quote PDF generator

import { useI18n } from "vue-i18n";

export const usePDF = () => {
  const { locale, t } = useI18n();

  const downloadCompanyProfile = async () => {
    // Dynamic import to avoid SSR issues
    const { jsPDF } = await import("jspdf");
    const isAr = locale.value === "ar";
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Background
    doc.setFillColor(6, 13, 26);
    doc.rect(0, 0, 210, 297, "F");

    // Header gradient simulation
    doc.setFillColor(30, 111, 217);
    doc.rect(0, 0, 210, 55, "F");

    // Company Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text("STB", 105, 28, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 216, 240);
    doc.text("Smart Technology & Business", 105, 38, { align: "center" });

    // Cyan line
    doc.setDrawColor(0, 212, 255);
    doc.setLineWidth(0.5);
    doc.line(20, 50, 190, 50);

    // About section
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(isAr ? "About Us" : "About Us", 20, 70);

    doc.setTextColor(200, 216, 240);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const aboutText = isAr
      ? "STB is a leading technology company specializing in integrated digital solutions. We transform your vision into outstanding digital reality with the highest quality standards."
      : "STB is a leading technology company specializing in integrated digital solutions. We transform your vision into outstanding digital reality with the highest quality standards.";
    const aboutLines = doc.splitTextToSize(aboutText, 170);
    doc.text(aboutLines, 20, 80);

    // Services
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Our Services", 20, 110);

    const services = [
      "• Web Development - Advanced websites & web apps",
      "• Mobile Apps - iOS & Android applications",
      "• Cloud Computing - Secure & scalable solutions",
      "• Artificial Intelligence - AI integration",
      "• Information Security - Comprehensive protection",
      "• Tech Consulting - Strategic digital guidance",
    ];

    doc.setTextColor(200, 216, 240);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    services.forEach((s, i) => {
      doc.text(s, 25, 122 + i * 9);
    });

    // Stats
    doc.setFillColor(13, 31, 60);
    doc.roundedRect(20, 185, 170, 40, 4, 4, "F");

    const statsData = [
      { val: "200+", lbl: "Projects" },
      { val: "150+", lbl: "Clients" },
      { val: "8+", lbl: "Years" },
      { val: "15+", lbl: "Countries" },
    ];

    statsData.forEach((s, i) => {
      const x = 30 + i * 42;
      doc.setTextColor(0, 212, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(s.val, x, 200);
      doc.setTextColor(144, 180, 232);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(s.lbl, x, 208);
    });

    // Contact
    doc.setDrawColor(0, 212, 255);
    doc.line(20, 238, 190, 238);

    doc.setTextColor(0, 212, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Contact Us", 20, 248);

    doc.setTextColor(200, 216, 240);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Email: info@stb-tech.com", 20, 258);
    doc.text("Phone: +20 100 000 0000", 20, 266);
    doc.text("Address: Cairo, Egypt", 20, 274);
    doc.text("Website: www.stb-tech.com", 20, 282);

    // Footer
    doc.setFillColor(30, 111, 217);
    doc.rect(0, 288, 210, 9, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(
      "© 2025 STB - Smart Technology & Business. All Rights Reserved.",
      105,
      294,
      { align: "center" },
    );

    doc.save("STB-Company-Profile.pdf");
  };

  const generateQuotePDF = async (data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    projectType: string;
    budget: string;
    timeline: string;
    requirements: string;
    features: string[];
    notes: string;
  }) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const isAr = locale.value === "ar";
    const quoteNum = "STB-" + Date.now().toString().slice(-6);
    const today = new Date().toLocaleDateString("en-GB");

    // BG
    doc.setFillColor(6, 13, 26);
    doc.rect(0, 0, 210, 297, "F");

    // Header
    doc.setFillColor(30, 111, 217);
    doc.rect(0, 0, 210, 50, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("STB", 20, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 216, 240);
    doc.text("Smart Technology & Business", 20, 32);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("QUOTE PROPOSAL", 190, 22, { align: "right" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 216, 240);
    doc.text(`#${quoteNum}`, 190, 30, { align: "right" });
    doc.text(`Date: ${today}`, 190, 38, { align: "right" });

    // Client Info
    let y = 65;
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CLIENT INFORMATION", 20, y);
    doc.setDrawColor(0, 212, 255);
    doc.setLineWidth(0.3);
    doc.line(20, y + 3, 190, y + 3);

    y += 12;
    doc.setTextColor(200, 216, 240);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const fields = [
      ["Name:", data.clientName || "---"],
      ["Email:", data.clientEmail || "---"],
      ["Phone:", data.clientPhone || "---"],
    ];
    fields.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(144, 180, 232);
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(200, 216, 240);
      doc.text(value, 55, y);
      y += 9;
    });

    // Project Details
    y += 6;
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PROJECT DETAILS", 20, y);
    doc.line(20, y + 3, 190, y + 3);

    y += 12;
    const projFields = [
      ["Type:", data.projectType || "---"],
      ["Budget:", data.budget || "---"],
      ["Timeline:", data.timeline || "---"],
    ];
    projFields.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(144, 180, 232);
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(200, 216, 240);
      doc.text(value, 55, y);
      y += 9;
    });

    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(144, 180, 232);
    doc.text("Requirements:", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 216, 240);
    const reqLines = doc.splitTextToSize(data.requirements || "---", 165);
    doc.text(reqLines, 20, y);
    y += reqLines.length * 6 + 8;

    // Features
    if (data.features.length > 0) {
      doc.setTextColor(0, 212, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("REQUIRED FEATURES", 20, y);
      doc.line(20, y + 3, 190, y + 3);
      y += 12;

      doc.setTextColor(200, 216, 240);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const cols = Math.ceil(data.features.length / 2);
      data.features.slice(0, cols).forEach((f, i) => {
        doc.text(`✓ ${f}`, 25, y + i * 8);
      });
      data.features.slice(cols).forEach((f, i) => {
        doc.text(`✓ ${f}`, 115, y + i * 8);
      });
      y += cols * 8 + 10;
    }

    // Notes
    if (data.notes) {
      doc.setTextColor(0, 212, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("ADDITIONAL NOTES", 20, y);
      doc.line(20, y + 3, 190, y + 3);
      y += 10;
      doc.setTextColor(200, 216, 240);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const noteLines = doc.splitTextToSize(data.notes, 165);
      doc.text(noteLines, 20, y);
      y += noteLines.length * 6 + 10;
    }

    // Footer
    doc.setFillColor(13, 31, 60);
    doc.rect(0, 275, 210, 22, "F");
    doc.setDrawColor(0, 212, 255);
    doc.line(0, 275, 210, 275);

    doc.setTextColor(144, 180, 232);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("info@stb-tech.com", 20, 284);
    doc.text("+20 100 000 0000", 20, 291);
    doc.text("www.stb-tech.com | Cairo, Egypt", 190, 284, { align: "right" });
    doc.setTextColor(0, 212, 255);
    doc.text("Thank you for choosing STB!", 190, 291, { align: "right" });

    doc.save(`STB-Quote-${quoteNum}.pdf`);
    return quoteNum;
  };

  return { downloadCompanyProfile, generateQuotePDF };
};
