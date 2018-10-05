var express = require('express');
var app = express();
var mysql = require('mysql');
var db = mysql.createConnection({ 
    host : 'localhost',
    user : 'root', 
    password : '', 
    database : 'toko'
}); 
var bodyParser = require('body-parser');
var cors = require('cors')

app.use(bodyParser.json());
app.use(cors());
db.connect()

app.post('/input', (req,res) => {
    
    var namaPost = req.body.nama ; 
    var hari_req = req.body.tglLahir.substr(0, 2)
    var bulan_req = req.body.tglLahir.substr(3, 2)
    var tahun_req = req.body.tglLahir.substr(6, 4)
    
    function generate_zodiak(hari, bulan) {
    
      var nama_z = {
        'capricorn':'Capricorn',
        'aquarius':'Aquarius',
        'pisces':'Pisces',
        'aries':'Aries',
        'taurus':'Taurus',
        'gemini':'Gemini',
        'cancer':'Cancer',
        'leo':'Leo',
        'virgo':'Virgo',
        'libra':'Libra',
        'scorpio':'Scorpio',
        'sagittarius':'Sagittarius'
      }
    
      if((bulan == 1 && hari <= 20) || (bulan == 12 && hari >=22)) {
        return nama_z.capricorn;
      } else if ((bulan == 1 && hari >= 21) || (bulan == 2 && hari <= 18)) {
        return nama_z.aquarius;
      } else if((bulan == 2 && hari >= 19) || (bulan == 3 && hari <= 20)) {
        return nama_z.pisces;
      } else if((bulan == 3 && hari >= 21) || (bulan == 4 && hari <= 20)) {
        return nama_z.aries;
      } else if((bulan == 4 && hari >= 21) || (bulan == 5 && hari <= 20)) {
        return nama_z.taurus;
      } else if((bulan == 5 && hari >= 21) || (bulan == 6 && hari <= 20)) {
        return nama_z.gemini;
      } else if((bulan == 6 && hari >= 22) || (bulan == 7 && hari <= 22)) {
        return nama_z.cancer;
      } else if((bulan == 7 && hari >= 23) || (bulan == 8 && hari <= 23)) {
        return nama_z.leo;
      } else if((bulan == 8 && hari >= 24) || (bulan == 9 && hari <= 23)) {
        return nama_z.virgo;
      } else if((bulan == 9 && hari >= 24) || (bulan == 10 && hari <= 23)) {
        return nama_z.libra;
      } else if((bulan == 10 && hari >= 24) || (bulan == 11 && hari <= 22)) {
        return nama_z.scorpio;
      } else if((bulan == 11 && hari >= 23) || (bulan == 12 && hari <= 21)) {
        return nama_z.sagittarius;
      }
    }

    var zodiaks = generate_zodiak(hari_req, bulan_req) ;

    function hitungUsia(tgl, bln, th ){
        var sekarang = new Date();
        var tanggal = parseInt(tgl);
        var bulan = parseInt(bln)-1;
        var tahun = parseInt(th);
        var tglLahir = new Date(tahun, bulan, tanggal);
        var selisih = (Date.parse(sekarang.toGMTString())-Date.parse(tglLahir.toGMTString()))/(1000*60*60*24);
        return Math.floor(selisih);
        
    }

    var umur = hitungUsia(hari_req, bulan_req, tahun_req)

    var data = {
        no: '',
        nama: namaPost,
        hari: hari_req,
        bulan: bulan_req,
        tahun: tahun_req, 
        zodiak: zodiaks,
        usia: umur


    };
        var sql = 'INSERT INTO karyawan SET ?'; db.query(sql, data, (err, result)=>{
            if(err) throw err; 
            console.log(result); 
            res.send('Data sukses di-input!')
    });
    
});

app.get('/', (req, res) => {
    res.send('get')
});

app.listen(3210, ()=>{ 
    console.log('Server 3210 Active') }
);