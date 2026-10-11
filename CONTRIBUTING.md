# Bijdragen aan Embassy Commons

Je kunt bijdragen met software, een vertaling, een les, een draaiboek, een foutcorrectie of gecontroleerde open data. Ieder land mag zelfstandig de basis gebruiken. Een bijdrage aan de gezamenlijke repository is vrijwillig en wordt beoordeeld voordat ze deel van een release wordt.

Lees eerst de [README](README.md), [governance](docs/GOVERNANCE.md), [het databeleid](docs/DATA-POLICY.md) en [de gedragscode](CODE_OF_CONDUCT.md). Gebruik [SECURITY.md](SECURITY.md) voor geheimen, kwetsbaarheden en ongewenste persoonsgegevens; zet die niet in een openbaar issue.

## Een goede eerste bijdrage

Begin met een afgebakende wijziging: een onjuiste link, een ontbrekende uitleg, een vertaling van één artikel of een fout in de startergenerator. Voor een nieuwe feature, groter schema of beleidswijziging maak je eerst een voorstel. Beschrijf het concrete gebruikersprobleem en de gevolgen voor bestaande lokale projecten.

De openbare upstream staat op https://github.com/Vinnybtc/embassy-commons. De normale route verloopt via issues, forks en pull requests. De privépreview dient om het product te beoordelen; gevoelige meldingen volgen SECURITY.md.

## Werkstappen

1. Maak een eigen kopie of fork en gebruik de lokale start- en validatiecommando's uit de README.
2. Maak een branch voor één samenhangende wijziging.
3. Pas het relevante bronbestand aan; wijzig een gegenereerde export via zijn bron zodat een nieuwe build de wijziging behoudt.
4. Voeg bron, licentie en status toe waar de inhoud dat vraagt. Houd lokale gegevens gescheiden van de gemeenschappelijke basis.
5. Voer de validator en relevante tests uit. Controleer de website in een browser bij wijzigingen aan de interface en lees de gegenereerde download terug bij wijzigingen aan exports.
6. Dien de wijziging in met het probleem, resultaat, controles, rechten en eventuele migratie.

De starter is bedoeld voor Node.js 22 of hoger en heeft geen externe runtimeafhankelijkheden nodig. De README is de bron voor de actuele bestandsnamen en commando's.

## Wat een pull request beschrijft

- Het gebruikersprobleem en het concrete resultaat.
- Of de wijziging code, kennis, template-data of materiaal van derden betreft.
- Welke bron en licentie gelden en waarom jij dit mag bijdragen.
- Welke controles zijn uitgevoerd en wat nog niet is gecontroleerd.
- De gevolgen voor bestaande configuraties, vertalingen en downstreamprojecten.

Een reviewer beoordeelt juistheid, bruikbaarheid, toegankelijkheid, compatibiliteit en publiceerbaarheid. Nieuwe echte data en grotere inhoudelijke wijzigingen vragen een tweede beoordeling. Een review kan om kleinere scope of bronbewijs vragen. De uiteindelijke beslissing en reden blijven zichtbaar bij de wijziging.

## Licenties en rechten

Door een bijdrage ter opname aan te bieden, bevestig je dat je die bijdrage mag leveren onder de licentie die voor het betreffende materiaal geldt. Je houdt je eigen auteursrechten voor zover van toepassing. Er is in de starter geen afzonderlijke overdracht van auteursrechten of contributor license agreement voorzien.

Eigen code gebruikt MIT. Eigen kennis gebruikt CC BY 4.0; vermeld naam of gekozen publieke auteursvermelding en de bron als je bestaand materiaal bewerkt. Eigen template-data kan CC0 1.0 gebruiken na rechten- en publicatiecontrole. Voor materiaal van derden is de oorspronkelijke licentie leidend; vermijd het kopiëren wanneer de hergebruikrechten onduidelijk zijn.

Voeg geen logo, foto, collectie of tekst toe onder een nieuwe licentie alleen omdat het origineel ergens publiek staat. Het Dutch Bitcoin Embassy merk en eventuele toekomstige erkenningslabels vallen onder afzonderlijke afspraken. Een bijdrage aan code verleent geen recht om officiële verbondenheid te claimen.

## Kennis en vertalingen

Schrijf voor iemand die een lokale gemeenschap begint. Leg de handeling en het doel uit; vermijd beleggingsbeloften en algemene claims die niet door de inhoud worden onderbouwd. Voor tijdgevoelige financiële, juridische of beveiligingsinformatie zijn een duidelijke scope, actuele primaire bron en review nodig. Een operationeel draaiboek mag uitleggen dat het lokale team specifieke zaken moet beoordelen, zonder uitkomsten voor alle landen te veronderstellen.

Een vertaling noemt de brontaal, het originele bestand en de gebruikte versie of hash. Verander geen betekenis om de lokale organisatie officieuzer te laten klinken. Een inhoudelijke lokale aanpassing mag, maar markeer het als een bewerking en leg relevante afwijkingen uit. Zodra het origineel verandert, moet de vertaling opnieuw worden beoordeeld.

## Data en veiligheid

Volg de publicatiepoort in het databeleid. Gebruik alleen eigen gecontroleerde templates of werkelijk vrijgegeven records. Voorbeeldlanden en fictieve records moeten als voorbeeld herkenbaar blijven. De validator kan de waarheid van een record of alle privacyrisico's in vrije tekst niet bepalen.

Plaats nooit seed phrases, sleutels, tokens, wachtwoorden, privécontactgegevens, ledenlijsten of interne berichten in een bijdrage. Een test gebruikt kunstmatige fixtures. Link niet naar privébestanden als bewijs in een openbare pull request; bied noodzakelijk bewijs via de afgesproken private reviewroute aan.

## Compatibiliteit en lokale verschillen

Wijzig een bestaand vereist veld of de betekenis ervan niet zonder een migratievoorstel. Houd software-, schema- en contentversie apart. Een major versie bevat migratie-instructies en een voorbeeld. Landelijke verschillen die alleen een lokaal team betreffen blijven in zijn eigen configuratie of content; een algemene mogelijkheid kan als herbruikbare verbetering worden aangeboden.

Voor een lokale update: pin de gekozen upstreamrelease, maak een updatebranch, vergelijk gedeelde bestanden, valideer de lokale configuratie en test de lokale website. Publiceer pas na lokale review. Upstream kan geen automatische updates op een lokale website afdwingen.
