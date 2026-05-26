const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'verify.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add kkData and viewKKModal
const kkDataStr = `
        const kkData = {
            "12345": { kepala: "BUDI SANTOSO", members: [ { nama: "Budi Santoso", nik: "3275012304910002", jk: "LAKI-LAKI", tempat: "BANDUNG", tgl: "19-10-1985", agama: "ISLAM", pend: "SLTA", hubungan: "KEPALA KELUARGA", ayah: "SUPARMAN", ibu: "SITI AMINAH" } ] },
            "AV-20230045": {
                kepala: "M. FAHMI MUSTOFA",
                members: [
                    { nama: "M. Fahmi Mustofa", nik: "3275012502930005", jk: "LAKI-LAKI", tempat: "BEKASI", tgl: "25-02-1993", agama: "ISLAM", pend: "S1", hubungan: "KEPALA KELUARGA", ayah: "MUSTOFA", ibu: "SITI AMINAH" }
                ]
            }
        };

        function viewKKModal() {
            const nik = document.getElementById('nik').value || "AV-20230045";
            const data = kkData[nik] || kkData["AV-20230045"];
            document.getElementById('kk-kepala-keluarga').innerText = data.kepala;
            const tableBody = document.getElementById('kk-members-table');
            const relationBody = document.getElementById('kk-members-relation-table');
            tableBody.innerHTML = ''; relationBody.innerHTML = '';
            data.members.forEach((member, index) => {
                tableBody.innerHTML += \`<tr class="text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"><td class="border border-gray-400 p-1">\${index + 1}</td><td class="border border-gray-400 p-1 text-left uppercase">\${member.nama}</td><td class="border border-gray-400 p-1">\${member.nik}</td><td class="border border-gray-400 p-1">\${member.jk}</td><td class="border border-gray-400 p-1">\${member.tempat}</td><td class="border border-gray-400 p-1">\${member.tgl}</td><td class="border border-gray-400 p-1">\${member.agama}</td><td class="border border-gray-400 p-1">\${member.pend}</td></tr>\`;
                relationBody.innerHTML += \`<tr class="text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"><td class="border border-gray-400 p-1">\${index + 1}</td><td class="border border-gray-400 p-1">\${member.hubungan}</td><td class="border border-gray-400 p-1">WNI</td><td class="border border-gray-400 p-1">-</td><td class="border border-gray-400 p-1">-</td><td class="border border-gray-400 p-1 uppercase">\${member.ayah}</td><td class="border border-gray-400 p-1 uppercase">\${member.ibu}</td></tr>\`;
            });
            document.getElementById('kk-modal').classList.remove('hidden');
        }

        function closeKKModal() {
            document.getElementById('kk-modal').classList.add('hidden');
        }
`;

content = content.replace('const STORAGE_KEY = \'avianScholarshipEntries\';', kkDataStr + '\n        const STORAGE_KEY = \'avianScholarshipEntries\';');

// 2. Modify Data Karyawan Header
const oldHeader = `<div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2634]">
<h2 class="text-[#111418] dark:text-white text-lg font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-avian-green">badge</span>
                                    Data Karyawan
                                </h2>
</div>`;

const newHeader = `<div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2634] flex items-center justify-between">
<h2 class="text-[#111418] dark:text-white text-lg font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-avian-green">badge</span>
                                    Data Karyawan
                                </h2>
<div class="flex items-center gap-2">
<button type="button" onclick="viewKKModal()" class="flex items-center gap-1.5 px-3 py-1.5 bg-avian-green/10 text-avian-green hover:bg-avian-green hover:text-white rounded font-semibold text-xs transition-colors shadow-sm whitespace-nowrap">
<span class="material-symbols-outlined text-[16px]">visibility</span>
                                        View KK
                                    </button>
<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Otomatis Terisi</span>
</div>
</div>`;
content = content.replace(oldHeader, newHeader);

// 3. Update Table Header
const oldTableHead = `<th class="px-4 py-3 w-1/4">Nama Anak Karyawan</th>
<th class="px-4 py-3">Tahun Ajaran</th>
<th class="px-4 py-3">Jenjang</th>
<th class="px-4 py-3">Semester</th>
<th class="px-4 py-3">Peringkat</th>
<th class="px-4 py-3 text-right">Estimasi Nominal</th>`;

const newTableHead = `<th class="px-4 py-3 w-12 text-center">Action</th>
<th class="px-4 py-3 w-1/4">Nama Anak Karyawan</th>
<th class="px-4 py-3">Tahun Ajaran</th>
<th class="px-4 py-3">Jenjang</th>
<th class="px-4 py-3">Semester</th>
<th class="px-4 py-3">Peringkat</th>
<th class="px-4 py-3 text-center">Status</th>
<th class="px-4 py-3 text-right">Estimasi Nominal</th>`;
content = content.replace(oldTableHead, newTableHead);

// 4. Update Table Row Logic
const oldRowLogic = `const rowHtml = \`
                <tr class="bg-white dark:bg-gray-800">
                    <td class="px-4 py-3 font-semibold text-[#111418] dark:text-white">\${params.get('anak') || 'Sarah Santoso'}</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">2025/2026</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300 uppercase">\${params.get('jenjang') || 'SMA'}</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300 capitalize">\${params.get('semester') || 'Ganjil'}</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">Peringkat \${params.get('peringkat') || '1'}</td>
                    <td class="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">Rp 1.800.000</td>
                </tr>
            \`;`;

const newRowLogic = `
            window.toggleVerifyChild = function(btn) {
                const tr = btn.closest('tr');
                const statusTd = tr.querySelector('.child-status');
                if (statusTd.innerText.trim() === 'VERIFIED') {
                    statusTd.innerText = 'NOT VERIFIED';
                    statusTd.className = 'child-status px-4 py-3 text-center font-bold text-amber-600';
                    btn.className = 'px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs transition-colors shadow-sm';
                    btn.innerText = 'VERIFY';
                } else {
                    statusTd.innerText = 'VERIFIED';
                    statusTd.className = 'child-status px-4 py-3 text-center font-bold text-emerald-600';
                    btn.className = 'px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded font-bold text-xs transition-colors shadow-sm';
                    btn.innerText = 'UNVERIFY';
                }
            };
            const anakName = params.get('anak') || 'Sarah Santoso';
            const rowHtml = \`
                <tr class="bg-white dark:bg-gray-800">
                    <td class="px-4 py-3 text-center">
                        <button type="button" onclick="toggleVerifyChild(this)" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs transition-colors shadow-sm">
                            VERIFY
                        </button>
                    </td>
                    <td class="px-4 py-3 font-semibold text-[#111418] dark:text-white">\${anakName}</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">2025/2026</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300 uppercase">\${params.get('jenjang') || 'SMA'}</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300 capitalize">\${params.get('semester') || 'Ganjil'}</td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">Peringkat \${params.get('peringkat') || '1'}</td>
                    <td class="child-status px-4 py-3 text-center font-bold text-amber-600">NOT VERIFIED</td>
                    <td class="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">Rp 1.800.000</td>
                </tr>
            \`;`;
content = content.replace(oldRowLogic, newRowLogic);

// 5. Replace Upload Documents Card entirely
const docCardRegex = /<!-- Upload Documents Card \(Verify View\) -->[\s\S]*?<!-- Approval Section -->/;
const newDocCard = `<!-- Lampiran Dokumen Per Anak Card -->
<div class="bg-white dark:bg-[#1a2634] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden" id="dokumen-lampiran-container">
<div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2634]">
<h2 class="text-[#111418] dark:text-white text-lg font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-avian-green">verified_user</span>
                                        Verifikasi Dokumen Lampiran (Rapor & Ranking)
                                    </h2>
</div>
<div class="p-6 flex flex-col gap-6" id="dokumen-per-anak">
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded p-4 flex items-center justify-between mb-4">
        <div>
            <h3 class="font-bold text-blue-800 dark:text-blue-200 mb-1 doc-child-name-display" id="doc-title-anak">Dokumen Anak</h3>
            <p class="text-xs text-blue-600 dark:text-blue-300">Tinjau kesesuaian rapor dan surat keterangan ranking anak.</p>
        </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Rapor -->
        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded border border-gray-200 dark:border-gray-700 shadow-inner flex flex-col items-center">
            <span class="material-symbols-outlined text-[#006837] text-4xl mb-2">picture_as_pdf</span>
            <span class="text-sm text-gray-800 dark:text-gray-200 font-semibold truncate">rapor_legalisir_final.pdf</span>
            <a href="./rapor_legalisir_final.pdf" target="_blank" rel="noopener noreferrer" class="mt-3 px-4 py-2 bg-avian-green hover:bg-avian-dark-green text-white rounded text-xs font-bold transition-colors inline-flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">visibility</span> View Rapor</a>
        </div>
        <!-- Ranking -->
        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded border border-gray-200 dark:border-gray-700 shadow-inner flex flex-col items-center">
            <span class="material-symbols-outlined text-[#006837] text-4xl mb-2">picture_as_pdf</span>
            <span class="text-sm text-gray-800 dark:text-gray-200 font-semibold truncate">surat_keterangan_ranking.pdf</span>
            <a href="./surat_keterangan_ranking.pdf" target="_blank" rel="noopener noreferrer" class="mt-3 px-4 py-2 bg-avian-green hover:bg-avian-dark-green text-white rounded text-xs font-bold transition-colors inline-flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">visibility</span> View Ranking</a>
        </div>
    </div>
</div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('anak') || 'Sarah Santoso';
        const docTitle = document.getElementById('doc-title-anak');
        if (docTitle) docTitle.innerText = "Dokumen: " + name;
    });
</script>

<!-- Approval Section -->`;

content = content.replace(docCardRegex, newDocCard);

// 6. Append kk-modal
const kkModalHtml = `
<!-- Modal View KK -->
<div id="kk-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-white dark:bg-[#1a2634] rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-[#1a2634]">
            <h3 class="text-[#111418] dark:text-white text-lg font-bold flex items-center gap-2">
                <span class="material-symbols-outlined text-avian-green">family_history</span>
                Dokumen Kartu Keluarga (KK)
            </h3>
            <button type="button" onclick="closeKKModal()" class="text-gray-500 hover:text-gray-700 dark:hover:text-white">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div class="p-6 overflow-y-auto flex-1 bg-gray-50 dark:bg-gray-900">
            <!-- KK Mock UI -->
            <div class="bg-white dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 shadow-sm font-mono text-xs text-gray-800 dark:text-gray-200 rounded max-w-full overflow-x-auto min-w-[700px]">
                <div class="text-center font-bold text-base border-b-2 border-double border-gray-800 dark:border-gray-200 pb-2 mb-4 uppercase">
                    KARTU KELUARGA<br>
                    <span class="text-sm font-normal">No. 3275012304910002</span>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <table class="w-full text-left">
                            <tr><td class="w-1/3 py-0.5 font-bold">Nama Kepala Keluarga</td><td class="py-0.5">: <span class="font-bold uppercase" id="kk-kepala-keluarga">BUDI SANTOSO</span></td></tr>
                        </table>
                    </div>
                </div>
                <div class="font-bold mb-1">I. DATA ANGGOTA KELUARGA</div>
                <table class="w-full border-collapse border border-gray-400 dark:border-gray-500 mb-6 text-[10px]">
                    <thead>
                        <tr class="bg-gray-100 dark:bg-gray-700 text-center font-bold">
                            <th class="border border-gray-400 p-1 w-6">No</th>
                            <th class="border border-gray-400 p-1">Nama Lengkap</th>
                            <th class="border border-gray-400 p-1 w-28">NIK</th>
                            <th class="border border-gray-400 p-1 w-18">Jenis Kelamin</th>
                            <th class="border border-gray-400 p-1 w-20">Tempat Lahir</th>
                            <th class="border border-gray-400 p-1 w-20">Tanggal Lahir</th>
                            <th class="border border-gray-400 p-1 w-16">Agama</th>
                            <th class="border border-gray-400 p-1 w-24">Pendidikan</th>
                        </tr>
                    </thead>
                    <tbody id="kk-members-table">
                    </tbody>
                </table>
                <div class="font-bold mb-1">II. STATUS HUBUNGAN DAN KELUARGA</div>
                <table class="w-full border-collapse border border-gray-400 dark:border-gray-500 text-[10px]">
                    <thead>
                        <tr class="bg-gray-100 dark:bg-gray-700 text-center font-bold">
                            <th class="border border-gray-400 p-1 w-6">No</th>
                            <th class="border border-gray-400 p-1">Status Hubungan</th>
                            <th class="border border-gray-400 p-1 w-24">Kewarganegaraan</th>
                            <th class="border border-gray-400 p-1 w-20">No. Paspor</th>
                            <th class="border border-gray-400 p-1 w-20">No. KITAP</th>
                            <th class="border border-gray-400 p-1">Nama Ayah</th>
                            <th class="border border-gray-400 p-1">Nama Ibu</th>
                        </tr>
                    </thead>
                    <tbody id="kk-members-relation-table">
                    </tbody>
                </table>
            </div>
        </div>
        <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end bg-gray-50 dark:bg-gray-900/50">
            <button type="button" onclick="closeKKModal()" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-sm font-semibold text-gray-800 dark:text-white transition-colors">Tutup</button>
        </div>
    </div>
</div>
</body>
`;
content = content.replace('</body>', kkModalHtml);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Patched successfully');
