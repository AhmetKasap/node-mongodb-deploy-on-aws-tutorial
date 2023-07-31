# 1.Adım AWS Sunucu Kiralama ve Sunucuya Bağlanma 
    1. AWS kayıt
    2. EC2 launch instance 
    3. Ubuntu server
    4. instances connect → EC2 instance connect → connect

# 2.Adım (Sunucu Ayarları ve Site Yayınlama) 
    
    # ubuntu güncellmeler ve yükseltmeler
    sudo apt update
    sudo apt upgrade
    
    # git kurulumu
    sudo apt install git
    git --version
    
    # nodejs kurulumu
    sudo apt install nodejs
    node --version
    npm --version
    
    # apache2 kurulumu
    sudo apt install apache2
    
    # apache2 ye sitenin eklenmesi
    cd /var/www                   # Siteyi yayınlayacağımız dosyayı açma.
    sudo mkdir denemeProje        # denemeProje adında bir klasör oluşturduk.
    cd denemeProje                # deneme proje içerisine girdik
    
    git clone adres               # yayınlayacağımız sitenin dosyalarını githubdan clonladık. (adress kısmı github clone linki olmalıdır.)
    
    sudo npm install -g pm2       # sunucuyu kesintisiz yayınlamak için pm2 kurduk.
    sudo pm2 start app.js         # projeyi yayınladık.
    
    # apache2 config
    
    cd /etc/apache2/sites-available # klasörüne git
    ls
    sudo mkdir nodeProject.conf     # conf dosyasını oluştur
    nanonodejsProject.conf          # conf içeriğini aç aşağıdaki kodu (kendi verilerine göre düzenle) yapıştır.
    
    <VirtualHost *:80>                                           # apache server default portu 80, düzenleme yapmanız gerekmez.
        ServerAdmin example@gmail.com                            # apache server da hata olması durumunda bilgilendirileceğiniz mail adresi.
        ServerName www.example.com                               # domain adresiniz.
        DocumentRoot /var/www/nodeProje/nodeProjectDeneme        # yukarıda apache eklediğimiz sitenin konumu
    
        ErrorLog ${APACHE_LOG_DIR}/error.log                     # loglar, düzenleme yapmanız gerekmez
        CustomLog ${APACHE_LOG_DIR}/access.log combined
    
        <Location "/">                                           # yönelendirme işlemi, local ip adresi ve nodejs projenizin çalıştıgı port numarası (burada 3000 portundan nodejs çalışıyor)
            ProxyPreserveHost On
            ProxyPass http://127.0.0.1:3000/
            ProxyPassReverse http://127.0.0.1:3000/
        </Location>
    </VirtualHost>
    
    sudo a2ensite nodejsProject.conf   # conf dosyasını etkinleştir
    sudo a2dissite 000-default.conf    # varsayılan conf dosyası etkinliğini sonlandır
    
    sudo a2enmod proxy                 # yönlendirme yapılabilmesi için ayarlamalar.
    sudo a2enmod proxy_http
    
    sudo systemctl start  apache2      # apache2 başlatma
    sudo systemctl status apache2      # apache2 çalıştığını kontrol etme
    
    
# 3.Adım (google domain alma ve siteyi domain ile erişme) 
    1. domain al
    2. AWS nin verdiği ubuntu sunucumuzun public ip adresiyle domaini eşleştirme.
