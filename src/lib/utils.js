
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


export const avgCalc = (val) => {
  let avereage 
  if (val.bunpou && val.choukai && val.kanji) {
    return avereage = parseInt((parseInt(val.bunpou)+parseInt(val.choukai)+parseInt(val.kanji))/3)
  } else if (val.bunpou && val.choukai) {
    return avereage = parseInt((parseInt(val.bunpou)+parseInt(val.choukai))/2)
  } else if (val.bunpou && val.kanji) {
    return avereage = parseInt((parseInt(val.bunpou)+parseInt(val.kanji))/2)
  } else if (val.choukai && val.kanji) {
    return avereage = parseInt((parseInt(val.choukai)+parseInt(val.kanji))/2)
  } else if (val.bunpou) {
    return avereage = parseInt(val.bunpou)
  } else if (val.choukai) {
    return avereage = parseInt(val.choukai)
  } else if (val.kanji) {
    return avereage = parseInt(val.kanji)
  } else {
    return avereage = 0
  }
}

export const gradeCalc = (part) => {
    let scoreGrade
    if (part <= 10) {
      return scoreGrade = 'E'
    } else if (part <= 20) {
      return scoreGrade = 'D'
    } else if (part <= 30) {
      return scoreGrade = 'C'
    } else if (part <= 40) {
      return scoreGrade = 'B'
    } else if (part <= 50) {
      return scoreGrade = 'A'
    }
  }