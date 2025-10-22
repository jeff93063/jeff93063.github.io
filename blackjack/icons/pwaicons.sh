declare -a arr=("16" "24" "32" "48" "57" "64" "72" "96" "120" "128" "144" "152" "195" "228" "256" "512")

for i in "${arr[@]}"
do
	inkscape -z --export-filename $i.png -w $i -h $i favicon.svg
done

convert 16.png 24.png 32.png 48.png 57.png 64.png 72.png 96.png 120.png 128.png 144.png 152.png 195.png 228.png 256.png 512.png favicon.ico
rm 16.png 24.png 32.png 48.png 57.png 64.png 72.png 96.png 120.png 128.png 144.png 152.png 195.png 228.png 256.png 512.png

inkscape -z --export-filename 96.png -w 96 -h 96 favicon.svg
inkscape -z --export-filename 512.png -w 512 -h 512 favicon.svg
inkscape -z --export-filename 192.png -w 192 -h 192 favicon.svg
inkscape -z --export-filename apple-touch-icon.png -w 180 -h 180 favicon.svg
inkscape -z --export-filename maskable512.png -w 512 -h 512 favicon-maskable.svg