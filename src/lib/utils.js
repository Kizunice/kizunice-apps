
// Format Currency
export const formatterJPY = (number) => new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
}).format(number);

export const formatterIDR = (number) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
}).format(number).replace(/(\.|,)00$/g, '');


// Masking Currency
function formatRupiah(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}