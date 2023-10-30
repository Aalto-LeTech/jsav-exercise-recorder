# 30.10.2023 Ari & Artturi: verkkoalgoritmi-JSAV:t

Dijkstra, askel 4: vertailu, teksti ei muutu.
Ari jättäisi askeleen 4 tai 5 pois. Askel 4 pois, mallivastauksen
kerronnasta vihreä "vertaile" pois, kun vertailu tehty.
Lihavoinnit opiskelijan tehtäviä askelia.
Entä jos askeleet esim. 4-6 yhdistäisi: ei vertailun korostusta.
Ylimääräinen mustausaskel pois.

Ari: voimakkain väri virityspuuhun laittamiseen, hennoin vertailuun.
Tuntematon väri pitäisi olla kaikista miedoin värin.
Vahvin väri virityspuulle, seuraavaksi vahvimman reunukselle, jotain
hailakampaa vertailuun ja tuntemattomille. Harmaa väri kuten nyt olisi paras
tuntemattomalle. Vaihdetaan vihreä ja keltainen päittäin. Vihreän voi helposti
yhdistää symbolisesti oikeaksi ratkaisuksi. Liikennevalosemanttiikka:
keltainen = "odota".

Scaffolded Dijkstra: opiskelijan kälissä PJ:stä poistettu solmu pitäisi
boldautua reunalta.

Scaffolded Dijkstra: virityspuun kaarella olisi 1 pikselin musta reunus
tai jotain vastaavaa. Alimalle prioriteetille.

DFS:ssä on aakkosjärjestys. Valuuko se Dijkstraan asti?
DFS: viimeisin vierailtu voisi olla boldattu kuten Dijkstrassa.
Analogian vuoksi samanlaista.

BFS: kaaren klikkaus olisi "visit", solmun klikkaus olisi "finish".
Matalalla prioriteetilla tämän toteutus, voi olla työläs.
Ei laiteta DFS:ään eikä BFS:ään. Pikemminkin finished (koodirivit 5 ja 14)
A+:n matskuissa voisi poistaa. Ei jonohavainnollistusta, koska sitten pitäisi
opiskelijan kälissä olla jono-operaatiot (lisää, poistaa).

Saisiko aakkosjärjestyksen DFS:stä ja BFS:stä pois antamalla verkko
vieruslistana? Tämä voisi olla yksi issue, ei korkea prioriteetti.
DFS:ssä tehtävän elementtien asettelukin on turhan ilmava juuri nyt.

DFS: ja BFS: visited-rivi koodissa pitäisi korostaa, jotta opiskelija
ymmärtää, millä rivillä koodia pitää tehdä kälioperaatio.

Primiin pseudokoodi, jotta voi korostaa kälioperaatioiden rivit:
"update or insert v into Q" sekä "u := remove from ..."

Arin mielipide: tällä viikolla on tärkeää saada yhtenäistetyt verkko-JSAV:t
kuntoon; saa priorisoida opintojen edelle. Opetustyötä.