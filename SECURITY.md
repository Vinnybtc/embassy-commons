# Veiligheidsbeleid voor Embassy Commons

De starter werkt met openbare bestanden, een statische interface en een lokale generator. Hij beheert geen wallets, ledenadministratie of betalingen. Beveiliging richt zich op veilige publicatie, invoer, downloads, broncode en het voorkomen van verspreiding van gevoelige gegevens.

## Private meldroute

Zet een kwetsbaarheid, token, seed phrase of ongewenst gepubliceerd persoonsgegeven niet in een openbaar issue. Deel in een private melding de getroffen versie, beschrijving, minimaal reproduceerbaar voorbeeld en verwachte impact. Gebruik kunstmatige gegevens waar mogelijk en deel geen geheim om te bewijzen dat het bestaat.

De eerste uitgever moet vóór een openbare communitylancering een werkend privaat contactkanaal en een onafhankelijke vervanger publiceren. Dat kanaal is nog niet toegewezen in deze starter. Tijdens de private review van dit pakket is Vincent de aanspreekpersoon voor het organiseren van die behandeling. Zodra er een publieke repository is, kan een geconfigureerde private vulnerability reporting functie als aanvullende route dienen. Veronderstel niet dat die functie nu bestaat.

Het project heeft nog geen bemande responstermijn, bug bounty of ondersteuning voor eerdere releaselijnen vastgesteld. Het pilotteam bepaalt dit op basis van beschikbare capaciteit. Onderzoek beperkt zich tot eigen of uitdrukkelijk toegestane omgevingen; verstoor geen websites van anderen.

## Wat meldbaar is

- Uitvoering van onbetrouwbare data of tekst in de interface.
- Onveilige bestandsnamen, paden of inhoud in gegenereerde downloads.
- Verspreiding van sleutels, tokens, wachtwoorden of persoonsgegevens.
- Onbedoeld bundelen van privébestanden of bronnen zonder passende rechten.
- Releasebestanden die afwijken van de beoordeelde bronversie.

Een normale inhoudsfout zonder gevoelige informatie gaat via een issue. Een fout die mensen of gegevens direct schaadt kan via het private kanaal worden gemeld.

## Behandeling van een incident

1. Bevestig de melding via het private kanaal en bepaal betrokken versies en bestanden.
2. Stop getroffen publicatie of download waar nodig en beperk verdere verspreiding.
3. Trek gelekte credentials in of vervang ze bij de betreffende eigenaar. Verwijderen uit Git maakt een credential niet opnieuw veilig.
4. Corrigeer bron en exports, beoordeel of releasebestanden of Git geschiedenis moeten worden opgeschoond en valideer de reparatie.
5. Publiceer een nieuwe release en een passende beschrijving met betrokken versies en benodigde acties, zonder gevoelige informatie.
6. Informeer bekende downstreambeheerders via geautoriseerde projectkanalen en verbeter het publicatieproces.

Reeds gedownloade kopieën kunnen blijven bestaan. Het project garandeert geen verwijdering van externe kopieën. Een local fork controleert zijn eigen historie en hosting en beslist over de eigen herstelactie.

## Praktische eisen voor publicatie

Behandel ingeladen records als onbetrouwbare invoer. Toon tekst als tekst, controleer URL-schema's en gebruik uitsluitend gecontroleerde lokale paden voor gegenereerde bestanden. Gebruik geen invoer om shellcommando's samen te stellen. De statische basis vraagt geen credentials; voeg ze niet toe aan configbestanden.

Voer de validator en relevante tests uit vóór een release, controleer de complete download en beperk hostingtoegang tot noodzakelijke beheerders. Houd privéadministratie en publieke bronbestanden in aparte omgevingen. Nieuwe externe afhankelijkheden vragen een reden, licentiecontrole en beoordeling van het extra onderhoud.

Een automatische controle ondersteunt deze eisen; zij bewijst niet dat iedere inhoudelijke, privacy- of licentiekwestie is opgelost. De publicatiepoort in [het databeleid](docs/DATA-POLICY.md) blijft noodzakelijk.
