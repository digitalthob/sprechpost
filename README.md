# Sprechpost

Aus einem Foto, deiner Stimme und deinem Post-Text wird ein quadratisches Video (1080 × 1080) mit Sound-Animation und Untertiteln. Gedacht für LinkedIn, funktioniert aber überall, wo quadratische Videos laufen.

**Direkt benutzen:** https://digitalthob.github.io/sprechpost/

Alles passiert im Browser. Foto, Aufnahme und Video verlassen deinen Rechner nicht.

## Als App installieren

In **Chrome oder Edge** die Seite öffnen und oben rechts auf „Als App installieren“ klicken (oder auf das Installieren-Symbol in der Adressleiste). Sprechpost öffnet sich dann in einem eigenen Fenster und liegt wie jede andere App im Programme-Ordner, im Dock und im Launchpad (Mac) bzw. im Startmenü (Windows). Die App startet auch ohne Internet und holt sich Updates automatisch, sobald du online bist.

Deinstallieren: in der App oben rechts auf das Drei-Punkte-Menü → „Sprechpost deinstallieren“.

## So geht's

1. **Foto** auf die Vorschau ziehen, Ausschnitt mit der Maus verschieben, bei Bedarf zoomen.
2. **Text** des Posts einfügen. Ein Klick entfernt Hashtags, Links und Emojis, damit du sie nicht vorliest.
3. **Look** wählen: Animation, Farben, Untertitel-Schrift, -Größe und -Stil, optional eine Namens-Einblendung.
4. **Einsprechen** mit dem Teleprompter. Er zeigt den Text Satz für Satz. Am Ende jedes Satzes drückst du die Leertaste oder tippst auf den Bildschirm. So wissen die Untertitel, wann der nächste Satz beginnt. Alternativ lädst du eine fertige Audiodatei und taktest danach.
5. **Video erstellen** und speichern. Optional zusätzlich die Untertitel als SRT-Datei.

Satzgrenzen lassen sich nachträglich in der Zeitleiste unter der Vorschau verschieben (Maus, oder Umschalt + Pfeiltasten).

Das Geräusch der Leertaste oder des Klicks am Satzende senkt die App in der Aufnahme automatisch ab, solange an der Stelle nicht gesprochen wird.

## Barrierearm posten

- Der Post-Text ist die Textfassung für Screenreader. Am besten sprichst du ihn wörtlich ein.
- Die Untertitel helfen allen, die gerade keinen Ton haben oder nicht hören können.
- **SRT statt eingebrannt:** Schalte in Schritt 5 „Untertitel ins Video einbrennen“ aus und lade die SRT-Datei im LinkedIn-Video-Editor über „CC“ hoch. Dann kann jede Person die Untertitel selbst ein- und ausschalten.
- LinkedIns automatische Untertitel ausschalten, sonst erscheinen sie doppelt.

## Browser

Am besten in **Chrome oder Edge** (Desktop). Dort entsteht das MP4 in wenigen Sekunden. Andere Browser nutzen einen Echtzeit-Export, der so lange dauert wie die Aufnahme. Das Mikrofon funktioniert nur über HTTPS, also über die GitHub-Pages-Adresse oben, nicht beim Öffnen der Datei auf dem iPhone.

## Datenschutz

- Keine Uploads, kein Tracking, keine externen Dienste. Auch die Schriften liegen in diesem Repository.
- Damit die App offline startet, legt der Browser die Programmdateien (nicht deine Inhalte) in seinem Zwischenspeicher ab.
- Deine Einstellungen, der Text und das zuletzt gewählte Foto (verkleinert) werden im lokalen Speicher deines Browsers abgelegt, damit sie beim nächsten Öffnen noch da sind. Löschen: Website-Daten für diese Seite im Browser entfernen.
- Die Aufnahme wird nicht gespeichert. Exportiere dein Video, bevor du die Seite schließt.

## Technik

Eine einzige HTML-Seite ohne Build-Schritt. Web Audio für Aufnahme und Spektralanalyse, Canvas für das Bild, WebCodecs für H.264/AAC und [mp4-muxer](https://github.com/Vanilagy/mp4-muxer) für die MP4-Datei. Als Rückfallebene dient MediaRecorder.

```
index.html            die App
manifest.webmanifest  Angaben für die Installation als App
sw.js                 Offline-Speicher (Service Worker)
icons/                App-Symbole
vendor/mp4-muxer.js   MP4-Container (MIT)
fonts/                Schriften, selbst gehostet (SIL OFL 1.1)
```

## Lizenz

Der Code von Sprechpost ist gemeinfrei (CC0 1.0, siehe [LICENSE](LICENSE)). Mach damit, was du willst.

Das gilt nicht für die mitgelieferten Fremdbestandteile. Sie behalten ihre eigenen Lizenzen:

- mp4-muxer: MIT, siehe `vendor/LICENSE-mp4-muxer.txt`
- Schriften (Schibsted Grotesk, Barlow Condensed, Nunito, Martian Mono): SIL Open Font License 1.1, siehe `fonts/LICENSE-*.txt`
