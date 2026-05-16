let data = [];
let editModeId = null;

// 🔹 BASE URL (BIAR GAMPANG DEPLOY)
const BASE_URL = "http://localhost:3000"; 
// nanti kalau deploy → ganti ke URL Render

// 🔹 ambil data
async function loadData() {
  try {
    let res = await fetch(`${BASE_URL}/data`);
    data = await res.json();
    render();
  } catch (err) {
    console.error("Gagal ambil data:", err);
  }
}

loadData();

// 🔹 tambah / update
async function tambahData() {
  let nama = document.getElementById("nama").value.trim();
  let jumlah = Number(document.getElementById("jumlah").value);

  // VALIDASI
  if (!nama || !jumlah) {
    alert("Isi semua data!");
    return;
  }

  if (jumlah <= 0) {
    alert("Jumlah harus lebih dari 0");
    return;
  }

  let item = { nama, jumlah };

  try {
    if (editModeId) {
      // UPDATE
      await fetch(`${BASE_URL}/data/${editModeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });

      editModeId = null;
    } else {
      // CREATE
      await fetch(`${BASE_URL}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });
    }

    // reset input
    document.getElementById("nama").value = "";
    document.getElementById("jumlah").value = "";

    loadData();

  } catch (err) {
    console.error("Gagal kirim data:", err);
  }
}

// 🔹 hapus
async function hapus(id) {
  if (!confirm("Yakin mau hapus?")) return;

  try {
    await fetch(`${BASE_URL}/data/${id}`, {
      method: "DELETE"
    });

    loadData();
  } catch (err) {
    console.error("Gagal hapus:", err);
  }
}

// 🔹 render
function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  data.forEach(item => {
    let isEdit = editModeId === item._id;

    let div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div>
        <div><b>${item.nama}</b></div>
        <small>${item._id}</small>
      </div>

      <div>
        ${
          isEdit
            ? `<input type="number" id="input-${item._id}" value="${item.jumlah}" />`
            : `<div>Rp ${item.jumlah}</div>`
        }

        <div style="margin-top:5px;">
          ${
            isEdit
              ? `
                <button onclick="simpanEdit('${item._id}')">💾 Simpan</button>
                <button onclick="batalEdit()">❌ Batal</button>
              `
              : `
                <button onclick="mulaiEdit('${item._id}')">✏️ Edit</button>
              `
          }

          <button onclick="hapus('${item._id}')">🗑️ Hapus</button>
        </div>
      </div>
    `;

    list.appendChild(div);
    total += item.jumlah;
  });

  // statistik
  document.getElementById("total").innerText = "Total: Rp " + total;

  let rata = data.length ? (total / data.length).toFixed(2) : 0;
  document.getElementById("rata").innerText = "Rata-rata: Rp " + rata;

  document.getElementById("jumlahData").innerText = data.length;
}

// 🔹 mulai edit
function mulaiEdit(id) {
  editModeId = id;
  render();
}

// 🔹 batal edit
function batalEdit() {
  editModeId = null;
  render();
}

// 🔹 simpan edit
async function simpanEdit(id) {
  let input = document.getElementById(`input-${id}`);
  let jumlahBaru = Number(input.value);

  if (jumlahBaru <= 0) {
    alert("Jumlah harus lebih dari 0");
    return;
  }

  let itemLama = data.find(d => d._id === id);

  try {
    await fetch(`${BASE_URL}/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nama: itemLama.nama,
        jumlah: jumlahBaru
      })
    });

    editModeId = null;
    loadData();

  } catch (err) {
    console.error("Gagal update:", err);
  }
}