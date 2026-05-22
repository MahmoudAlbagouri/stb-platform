<template>
  <div
    class="min-h-screen bg-slate-100 py-8 print:bg-white print:py-0 print:min-h-0"
    dir="rtl"
  >
    <div
      class="max-w-[21cm] mx-auto mb-4 px-4 flex justify-between items-center print:hidden"
    >
      <div class="text-sm text-slate-500 font-medium">
        ✨ تم الانتقال إلى حقول متمددة تلقائياً (ContentEditable) لضمان ظهور
        كامل النص عند الطباعة.
      </div>

      <button
        @click="printQuotation"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md transition-all transform active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        طباعة عرض السعر / حفظ PDF
      </button>
    </div>

    <div
      id="quotation-card"
      class="bg-white p-10 max-w-[25cm] min-h-[29.7cm] mx-auto shadow-xl border border-slate-200/80 rounded-sm relative print:shadow-none print:border-none print:p-0 print:max-w-full print:w-full print:min-h-0"
    >
      <div
        class="flex justify-between items-center border-b-2 border-slate-200 pb-6 mb-6"
      >
        <div class="space-y-1 flex-1">
          <div
            contenteditable="true"
            @input="company.name = $event.target.innerText"
            class="editable-input text-2xl font-black text-slate-800 w-full min-w-[100px]"
          >
            {{ company.name }}
          </div>
          <div
            contenteditable="true"
            @input="company.subName = $event.target.innerText"
            class="editable-input text-sm text-blue-600 font-bold w-full min-w-[100px]"
          >
            {{ company.subName }}
          </div>
          <div
            class="flex items-center text-xs text-slate-500 font-semibold gap-1 mt-1"
          >
            <span class="whitespace-nowrap">السجل التجاري:</span>
            <div
              contenteditable="true"
              @input="company.crNumber = $event.target.innerText"
              class="editable-input w-36 font-mono text-slate-700 min-w-[50px]"
            >
              {{ company.crNumber }}
            </div>
          </div>
        </div>

        <div
          class="text-center space-y-3 px-4 flex flex-col items-center flex-1"
        >
          <div
            class="h-16 w-40 flex items-center justify-center rounded p-1 overflow-hidden"
          >
            <img
              :src="company.logoUrl"
              alt="STB Logo"
              class="max-h-full max-w-full object-contain"
            />
          </div>
          <div
            contenteditable="true"
            @input="quotationNumber = $event.target.innerText"
            class="editable-input text-center text-xs bg-slate-100 font-mono font-bold text-slate-700 px-3 py-1 rounded-md border border-slate-200 w-36 min-w-[80px]"
          >
            {{ quotationNumber }}
          </div>
        </div>

        <div
          class="text-left text-xs text-slate-500 space-y-1.5 flex-1 flex flex-col items-end"
        >
          <div class="flex items-center gap-1">
            <span class="text-slate-400 whitespace-nowrap">التاريخ:</span>
            <div
              contenteditable="true"
              @input="date = $event.target.innerText"
              class="editable-input font-mono text-left w-28 font-semibold text-slate-700 min-w-[60px]"
            >
              {{ date }}
            </div>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-slate-400 whitespace-nowrap">الموقع:</span>
            <div
              contenteditable="true"
              @input="company.website = $event.target.innerText"
              class="editable-input font-mono text-blue-600 font-medium text-left w-36 min-w-[80px]"
            >
              {{ company.website }}
            </div>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-slate-400 whitespace-nowrap">الجوال:</span>
            <div
              contenteditable="true"
              @input="company.phone = $event.target.innerText"
              class="editable-input font-mono text-left w-28 text-slate-700 min-w-[60px]"
            >
              {{ company.phone }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl mb-6 border border-slate-200/60 text-sm"
      >
        <div class="space-y-1.5">
          <p class="text-xs text-blue-600 font-bold tracking-wide uppercase">
            العميل / Customer
          </p>
          <div
            contenteditable="true"
            @input="customer.name = $event.target.innerText"
            class="editable-input font-extrabold text-slate-800 w-full text-base block leading-normal min-h-[1.5em]"
            placeholder="اسم الشركة أو العميل"
          >
            {{ customer.name }}
          </div>

          <div class="flex items-center text-xs text-slate-600 font-mono gap-1">
            <span class="text-slate-400 whitespace-nowrap">الجوال:</span>
            <div
              contenteditable="true"
              @input="customer.mobile = $event.target.innerText"
              class="editable-input font-mono bg-transparent w-full font-semibold text-slate-700 min-w-[80px]"
            >
              {{ customer.mobile }}
            </div>
          </div>
          <div class="flex items-center text-xs text-slate-500 font-mono gap-1">
            <span class="text-slate-400 whitespace-nowrap">كود العميل:</span>
            <div
              contenteditable="true"
              @input="customer.id = $event.target.innerText"
              class="editable-input font-mono bg-transparent w-full font-bold min-w-[40px]"
            >
              {{ customer.id }}
            </div>
          </div>
        </div>
        <div class="text-right space-y-1.5 border-r-2 border-slate-200 pr-5">
          <p class="text-xs text-slate-400 font-bold tracking-wide uppercase">
            المرسل / Sender
          </p>
          <div
            contenteditable="true"
            @input="company.brandName = $event.target.innerText"
            class="editable-input font-bold text-slate-800 w-full bg-transparent min-w-[100px]"
          >
            {{ company.brandName }}
          </div>
          <div
            contenteditable="true"
            @input="company.address = $event.target.innerText"
            class="editable-input text-xs text-slate-600 w-full bg-transparent font-medium min-w-[100px]"
          >
            {{ company.address }}
          </div>
          <div
            contenteditable="true"
            @input="company.email = $event.target.innerText"
            class="editable-input text-xs font-mono text-slate-400 w-full bg-transparent min-w-[100px]"
          >
            {{ company.email }}
          </div>
        </div>
      </div>

      <div class="text-center my-8">
        <h2
          class="text-xl font-black text-slate-800 border-b-2 border-slate-800 inline-block pb-1.5 px-12 uppercase tracking-wide"
        >
          عرض سعر / Quotation
        </h2>
      </div>

      <div class="overflow-x-auto mb-3 no-scrollbar">
        <table
          class="w-full text-right border-collapse border border-slate-300 shadow-sm rounded-sm table-fixed"
        >
          <thead>
            <tr class="bg-slate-800 text-white text-xs font-bold">
              <th class="p-3 border border-slate-700 w-10 text-center">#</th>
              <th class="p-3 border border-slate-700 w-7/12">
                المنتج / الخدمة (Description)
              </th>
              <th class="p-3 border border-slate-700 text-center w-24">
                الكود
              </th>
              <th class="p-3 border border-slate-700 text-center w-16">
                الكمية
              </th>
              <th class="p-3 border border-slate-700 text-left w-24">
                سعر الوحدة
              </th>
              <th class="p-3 border border-slate-700 text-left w-20">الخصم</th>
              <th class="p-3 border border-slate-700 text-left w-16">
                الضريبة
              </th>
              <th class="p-3 border border-slate-700 text-left w-28">
                الإجمالي
              </th>
              <th
                class="p-3 border border-slate-700 w-12 text-center print:hidden"
              >
                إجراء
              </th>
            </tr>
          </thead>
          <tbody class="text-xs">
            <tr
              v-for="(item, index) in items"
              :key="index"
              class="hover:bg-slate-50/60 transition-colors"
            >
              <td
                class="p-3 text-center text-slate-400 font-mono font-bold border border-slate-200 bg-slate-50/30"
              >
                {{ index + 1 }}
              </td>

              <td
                class="p-3 border border-slate-200 space-y-2 align-top break-words whitespace-pre-wrap"
              >
                <div
                  contenteditable="true"
                  @input="item.nameEn = $event.target.innerText"
                  class="editable-input font-bold text-slate-800 leading-relaxed w-full outline-none block min-h-[1.2em]"
                  placeholder="English Description"
                >
                  {{ item.nameEn }}
                </div>
                <div
                  contenteditable="true"
                  @input="item.nameAr = $event.target.innerText"
                  class="editable-input text-slate-600 font-medium leading-relaxed w-full outline-none block min-h-[1.2em]"
                  placeholder="الوصف باللغة العربية"
                >
                  {{ item.nameAr }}
                </div>
              </td>

              <td
                class="p-2 text-center border border-slate-200 align-top font-mono"
              >
                <div
                  contenteditable="true"
                  @input="item.code = $event.target.innerText"
                  class="editable-input text-center text-slate-600 w-full font-medium break-all"
                >
                  {{ item.code }}
                </div>
              </td>
              <td
                class="p-2 text-center border border-slate-200 align-top font-mono"
              >
                <div
                  contenteditable="true"
                  @input="parseNumber($event, item, 'quantity')"
                  class="editable-input text-center w-full font-bold"
                >
                  {{ item.quantity }}
                </div>
              </td>
              <td
                class="p-2 border border-slate-200 align-top text-left font-mono"
              >
                <div
                  contenteditable="true"
                  @input="parseNumber($event, item, 'unitPrice')"
                  class="editable-input text-left w-full font-semibold"
                >
                  {{ item.unitPrice }}
                </div>
              </td>
              <td
                class="p-2 border border-slate-200 align-top text-left font-mono"
              >
                <div
                  contenteditable="true"
                  @input="parseNumber($event, item, 'discount')"
                  class="editable-input text-left w-full text-red-600"
                >
                  {{ item.discount }}
                </div>
              </td>
              <td class="p-2 border border-slate-200 align-top font-mono">
                <div class="flex items-center gap-0.5 justify-end">
                  <div
                    contenteditable="true"
                    @input="parseNumber($event, item, 'vat')"
                    class="editable-input text-left w-10 text-slate-700"
                  >
                    {{ item.vat }}
                  </div>
                  <span class="text-slate-400 font-bold">%</span>
                </div>
              </td>
              <td
                class="p-3 text-left font-mono font-black text-slate-800 border border-slate-200 bg-slate-50/50 text-sm align-top"
              >
                {{ formatCurrency(calculateRowTotal(item)) }}
              </td>
              <td
                class="p-2 text-center border border-slate-200 align-middle print:hidden"
              >
                <button
                  @click="removeItem(index)"
                  class="text-red-500 hover:text-red-700 font-bold p-1 transition-colors"
                >
                  حذف
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        @click="addNewItem"
        class="print:hidden mb-8 text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-all"
      >
        + إضافة منتج / خدمة جديدة
      </button>

      <div class="grid grid-cols-12 gap-6 items-start mt-2">
        <div class="col-span-7 space-y-4 text-[11px] text-slate-600">
          <div
            class="border border-slate-200 p-3.5 rounded-xl bg-slate-50/50 shadow-sm border-dashed"
          >
            <h4
              class="font-bold text-blue-700 mb-2 pb-1 border-b border-slate-200 flex items-center gap-1.5"
            >
              <span>🏦 الحسابات البنكية المعتمدة:</span>
            </h4>
            <div
              v-for="(bank, bIdx) in bankAccounts"
              :key="bIdx"
              class="mb-2.5 last:mb-0 space-y-0.5"
            >
              <div
                contenteditable="true"
                @input="bank.name = $event.target.innerText"
                class="editable-input font-bold text-slate-700 w-full p-0"
              >
                {{ bank.name }}
              </div>
              <div
                contenteditable="true"
                @input="bank.iban = $event.target.innerText"
                class="editable-input font-mono text-slate-900 select-all w-full tracking-wider p-0 text-xs font-semibold"
              >
                {{ bank.iban }}
              </div>
            </div>
          </div>

          <div class="space-y-1.5">
            <h4 class="font-bold text-slate-800 text-xs">
              📜 الشروط والأحكام:
            </h4>
            <div class="space-y-1.5 pr-1">
              <div
                v-for="(term, tIdx) in terms"
                :key="tIdx"
                class="flex gap-2 items-start group"
              >
                <span class="mt-1 text-slate-400 font-mono font-bold"
                  >{{ tIdx + 1 }}.</span
                >
                <div
                  contenteditable="true"
                  @input="terms[tIdx] = $event.target.innerText"
                  class="editable-input flex-1 text-slate-600 bg-transparent py-0 focus:bg-white"
                >
                  {{ terms[tIdx] }}
                </div>
                <button
                  @click="removeTerm(tIdx)"
                  class="text-red-500 hover:text-red-700 hidden group-hover:block print:hidden font-bold text-[10px]"
                >
                  حذف
                </button>
              </div>
              <button
                @click="addTerm"
                class="print:hidden text-[10px] text-blue-600 font-bold mt-1 hover:underline"
              >
                + إضافة شرط جديد
              </button>
            </div>
          </div>
        </div>

        <div
          class="col-span-5 text-xs space-y-3 border border-slate-300 rounded-xl p-4 bg-slate-50/80 shadow-inner"
        >
          <div class="flex justify-between text-slate-600 font-medium">
            <span>الإجمالي قبل الضريبة:</span>
            <span class="font-mono font-bold text-slate-800">{{
              formatCurrency(totals.subtotal)
            }}</span>
          </div>
          <div class="flex justify-between text-slate-600 font-medium">
            <span>إجمالي الخصومات:</span>
            <span class="font-mono font-bold text-red-600">{{
              formatCurrency(totals.discount)
            }}</span>
          </div>
          <div class="flex justify-between text-slate-600 font-medium">
            <span>قيمة الضريبة المضافة:</span>
            <span class="font-mono font-bold text-slate-800">{{
              formatCurrency(totals.vatAmount)
            }}</span>
          </div>
          <div
            class="flex justify-between text-sm font-bold text-slate-900 pt-3 border-t-2 border-slate-300"
          >
            <span class="text-slate-800">الإجمالي النهائي:</span>
            <div class="text-left">
              <span class="font-mono text-blue-700 text-lg font-black">{{
                formatCurrency(totals.grandTotal)
              }}</span>
              <span class="text-[10px] text-slate-500 mr-1">ريال</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-16 pt-6 border-t-2 border-slate-200 grid grid-cols-3 items-center gap-4 text-center"
      >
        <div class="flex flex-col items-center justify-center space-y-1">
          <div
            class="h-14 flex items-center justify-center overflow-hidden p-1"
          >
            <img
              :src="company.maroofLogoUrl"
              alt="معروف والمركز السعودي للأعمال"
              class="max-h-full object-contain"
            />
          </div>
          <div
            class="flex items-center justify-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-mono text-[10px] font-bold shadow-sm"
          >
            <span>رقم معروف:</span>
            <div
              contenteditable="true"
              @input="company.maroofId = $event.target.innerText"
              class="bg-transparent text-center font-bold font-mono w-14 outline-none border-none p-0 focus:ring-0"
            >
              {{ company.maroofId }}
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center space-y-1">
          <div
            class="w-16 h-16 bg-slate-50/50 rounded-full border border-slate-200 border-dashed flex items-center justify-center text-[10px] text-slate-300"
          >
            [محل الختم]
          </div>
          <span
            class="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider"
            >Official Stamp</span
          >
        </div>

        <div class="flex flex-col items-center justify-center space-y-3">
          <span class="text-xs text-slate-700 font-extrabold"
            >التوقيع والختم المعتمد</span
          >
          <div class="w-28 h-6 border-b-2 border-slate-400 border-dashed"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
definePageMeta({
  layout: "blank",
});

const company = ref({
  name: "Smart Tech Business",
  subName: "التقنية الذكية للأعمال",
  brandName: "Smart Technology For Business (STB)",
  crNumber: "7053885393",
  website: "www.stbsa.co",
  email: "info@stbsa.co",
  phone: "0555688143",
  address: "جدة _ المملكة العربية السعودية",
  maroofId: "37240",
  logoUrl: "https://stbsa.co/storage/logo.png",
  maroofLogoUrl: "https://stbsa.co/storage/s.png",
});

const quotationNumber = ref("QP-2026-00034");
const date = ref("20/05/2026");

const customer = ref({
  name: "شركة الهاجدية للتجارة والمقاولات المحدودة",
  mobile: "966581046429",
  id: "CO0015",
});

const items = ref([
  {
    nameEn:
      "ZKTeco MB10 Multi - Biometric T&A and Access Control Terminal Fingerprint, face, RFID and password 4 type verification mode",
    nameAr: "جهاز البصمة يدعم البصمة اليد والوجه وكلمة السر والكارت الممغنط",
    code: "B07VN85KXM",
    quantity: 1,
    unitPrice: 450.0,
    discount: 0.0,
    vat: 0,
  },
  {
    nameEn: "installing and uploading the program online with development",
    nameAr: "البرنامج اون لاين مع رسوم التركيب والشحن",
    code: "i028S",
    quantity: 1,
    unitPrice: 2050.0,
    discount: 0.0,
    vat: 0,
  },
]);

const bankAccounts = ref([
  { name: "الأهلي السعودي", iban: "SA4710000001400035729003" },
  { name: "مصرف الإنماء", iban: "SA3605000068207272169000" },
]);

const terms = ref([
  "ضمان الجهاز 3 سنوات عند الوكيل.",
  "الدعم الفني مجاناً لمدة 3 أشهر.",
  "البرنامج يعمل مجاناً لمدة 6 أشهر وبعد ذلك يكون باشتراك سنوي بقيمة 500 ريال.",
]);

// دالة لمعالجة إدخال الأرقام من عناصر contenteditable وحفظها بشكل صحيح كمقادير رياضية
const parseNumber = (event, item, key) => {
  const value = parseFloat(event.target.innerText.replace(/[^0-9.]/g, ""));
  item[key] = isNaN(value) ? 0 : value;
};

const addNewItem = () => {
  items.value.push({
    nameEn: "",
    nameAr: "",
    code: "",
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    vat: 0,
  });
};

const removeItem = (index) => {
  if (items.value.length > 1) items.value.splice(index, 1);
};

const addTerm = () => terms.value.push("");
const removeTerm = (index) => terms.value.splice(index, 1);

const calculateRowTotal = (item) => {
  const qty = item.quantity || 0;
  const price = item.unitPrice || 0;
  const disc = item.discount || 0;
  const vat = item.vat || 0;

  const basePrice = price * qty - disc;
  return basePrice + basePrice * (vat / 100);
};

const totals = computed(() => {
  let subtotal = 0,
    discount = 0,
    vatAmount = 0;
  items.value.forEach((item) => {
    const qty = item.quantity || 0;
    const price = item.unitPrice || 0;
    const disc = item.discount || 0;
    const vt = item.vat || 0;

    subtotal += price * qty;
    discount += disc;
    vatAmount += (price * qty - disc) * (vt / 100);
  });
  return {
    subtotal,
    discount,
    vatAmount,
    grandTotal: subtotal - discount + vatAmount,
  };
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const printQuotation = () => {
  window.print();
};
</script>

<style scoped>
.editable-input {
  border: 1px solid transparent;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.15s ease-in-out;
  background-color: transparent;
}
.editable-input:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}
.editable-input:focus {
  outline: none;
  border-color: #2563eb;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
}

/* نمط لإظهار placeholder وهمي لعناصر contenteditable الفارغة */
[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  color: #94a3b8;
  pointer-events: none;
  display: block;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media print {
  .print\:hidden {
    display: none !important;
  }

  body,
  html {
    background: #ffffff !important;
    margin: 0 !important;
    padding: 0 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .editable-input {
    border: none !important;
    padding: 0 !important;
    background-color: transparent !important;
    box-shadow: none !important;
    outline: none !important;
  }

  @page {
    size: A4;
    margin: 1.4cm 1.2cm;
  }

  #quotation-card {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
