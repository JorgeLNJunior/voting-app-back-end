sudo mysql -e "use mysql; update user set authentication_string=PASSWORD('root') where User='root'; update user set plugin='mysql_native_password';FLUSH PRIVILEGES;"
sudo service mysql restart
