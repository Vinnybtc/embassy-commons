# Aansluiting op het bestaande DBE-platform

Onderzocht op 11 oktober 2026 via de geautoriseerde GitHub-verbinding. Dit is een beperkte, read-only verkenning van repositorystructuur, packagebestanden en de README van de community-app. Geen bestaande code of operationele data is opgenomen in Embassy Commons. Beschreven functionaliteit uit een README is geen bevestiging dat die functionaliteit productiegeschikt is.

## Bestaande website

[`Vinnybtc/dbe-site`](https://github.com/Vinnybtc/dbe-site) gebruikt Astro, TypeScript en Node 24. Het packagebestand bevat Supabase- en Vercel-bibliotheken en build- en testflows voor beheer, content, media en publicatie. De bronstructuur bevat `src/content`, `src/data`, `src/i18n`, componenten, pagina's en API-bestanden.

Bronnen: [package.json](https://github.com/Vinnybtc/dbe-site/blob/main/package.json), [src](https://github.com/Vinnybtc/dbe-site/tree/main/src), [src/data](https://github.com/Vinnybtc/dbe-site/tree/main/src/data), [api](https://github.com/Vinnybtc/dbe-site/tree/main/api).

Een aansluiting kan een nieuwe exportstap in de bestaande publicatieflow gebruiken: geselecteerde educatieve content omzetten naar het Commons-datamodel, vervolgens rechten, schema en publicatiestatus controleren. De bestaande API-bestanden zijn niet inhoudelijk onderzocht; er is dus nog geen bewezen kant-en-klare Commons-API of importcompatibiliteit.

## Bestaande community-app

[`Vinnybtc/dbe-app`](https://github.com/Vinnybtc/dbe-app) is een PWA met vanilla HTML, JavaScript en CSS. De README beschrijft Supabase als backend en Cloudflare Pages als hosting, met LNURL-auth en een magic-link-fallback. De README vermeldt een werkende demo en authenticatie die nog niet live is. Dit is een README-status, geen onafhankelijke liveverificatie.

Concepten die bij het internationale model passen zijn events, kennisbank, educatieve leerroutes, lokale groepen en een communitymarktplaats. De Commons-basis levert hierbij een overdraagbaar publiek datamodel en een lokale website; een productiecommunity met gebruikersauthenticatie, chat en RSVP-opslag is een aparte integratiefase.

Bronnen: [README.md](https://github.com/Vinnybtc/dbe-app/blob/main/README.md), [package.json](https://github.com/Vinnybtc/dbe-app/blob/main/package.json), [bronbestanden](https://github.com/Vinnybtc/dbe-app).

## Publicatiegrens

Voor hergebruik geschikte kandidaten zijn algemene educatie, evenementtemplates, publieke evenementinformatie, vertalingen en werkprocessen. Per kandidaat moeten het auteursrecht, de bron, de gekozen licentie en de publicatiestatus vaststaan.

Ledengegevens, privéchat, aanmeldingen, persoonsgegevens en operationele configuratie behoren niet automatisch tot de openbare dataset. Landenteams beheren zulke gegevens in hun eigen omgeving. De twee onderzochte repositories waren bij het onderzoek privé; er is geen wijziging aan hun zichtbaarheid of inhoud uitgevoerd. In de onderzochte rootlijsten stond geen afzonderlijk LICENSE-bestand. Een definitieve open-source-release van bestaande DBE-code vereist daarom eerst een expliciete licentie- en inhoudscontrole.

## Concrete vervolgstap

1. Selecteer een kleine openbare DBE-collectie en leg bron en rechten per record vast.
2. Bouw een adapter die die collectie naar het Commons-schema exporteert.
3. Laat de bestaande CI de export valideren; publiceer alleen records die de publicatieregels doorstaan.
4. Test de export in een onafhankelijke landfork, met eigen domein, branding en lokale data.

De Commons-starter is zelfstandig geschreven en bevat demonstratiedata. Deze verkenning vormt een technisch aansluitingsplan, geen migratie van het bestaande DBE-platform.
