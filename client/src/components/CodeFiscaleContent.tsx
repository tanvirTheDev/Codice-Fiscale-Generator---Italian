export default function CodeFiscaleContent() {
  return (
    <div className="h-full pt-10 mt-10">
      <div className="w-full px-4 md:px-8 mx-auto">
        {/* Main Content Card */}
        <div className="overflow-hidden">
          {/* Header */}
          <div className="px-4">
            <h1 className=" text-[30px] sm:text-[20px] md:text-[25px] font-bold italic text-black tracking-wide">
              Codice Fiscale: cos'è e come si calcola
            </h1>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-gray-800 space-y-4 leading-relaxed">
              <p className="text-lg">
                Il <strong className="text-[#DDC092]">codice fiscale</strong> è
                un codice utilizzato ai fini fiscali ed amministrativi per
                identificare in modo univoco i cittadini italiani.
              </p>

              <p className="text-lg">
                È un codice alfanumerico di 16 caratteri, generato da un
                semplice algoritmo ed introdotto nel 1973 da un decreto del
                Presidente della Repubblica (decreto 605 del 29/09/1973)
              </p>

              <p className="text-lg">
                Per il{" "}
                <strong className="text-[#DDC092]">
                  calcolo del codice fiscale
                </strong>{" "}
                si procede grossomodo così:
              </p>

              {/* Bullet Points */}
              <ul className="space-y-3 ml-4 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-[#DDC092] font-bold">•</span>
                  <span>
                    le prime tre lettere del codice fiscale sono prese dal
                    cognome (solitamente prima, seconda e terza consonante)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DDC092] font-bold">•</span>
                  <span>
                    le seconde tre dal nome (solitamente prima, terza e quarta
                    consonante)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DDC092] font-bold">•</span>
                  <span>le ultime due cifre dell'anno di nascita</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DDC092] font-bold">•</span>
                  <span>
                    una lettera per il mese (A = Gennaio, B, C, D, E, H, L, M,
                    P, R, S, T = Dicembre)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DDC092] font-bold">•</span>
                  <span>
                    il giorno di nascita: in caso di sesso femminile si aggiunge
                    40 per cui è chiaro che se si trova scritto, ad esempio, 52,
                    non può che trattarsi di una donna nata il 12 del mese.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DDC092] font-bold">•</span>
                  <span>Codice del comune (quattro caratteri)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DDC092] font-bold">•</span>
                  <span>
                    Carattere di controllo, per verificare la correttezza del
                    codice fiscale.
                  </span>
                </li>
              </ul>

              <p className="text-lg italic text-gray-600">
                (per dettagli più precisi si veda{" "}
                <a
                  href="#"
                  className="text-[#DDC092] hover:text-lime-800 underline font-medium"
                >
                  codice fiscale su wikipedia
                </a>
                )
              </p>

              <p className="text-lg">
                È possibile che due persone abbiano lo stesso codice fiscale ma,
                in questo caso, l'Agenzia delle Entrate provvede a sostituire
                alcuni caratteri per risolvere l'ambiguità. Il presente calcolo
                online del codice fiscale segue le regole del DM del 12/03/1974,
                trascurando i rari casi di omocodie (più frequenti per cittadini
                esteri) e relative correzioni note solo all'Agenzia delle
                Entrate.
              </p>
            </div>

            {/* White Box Section */}
            <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-xl p-6 border-2 border-lime-200">
              <p className="text-gray-800 text-lg">
                <strong className="text-[#DDC092]">
                  Devi verificare un codice fiscale o estrarre i dati?
                </strong>{" "}
                Vai alla pagina{" "}
                <a
                  href="#"
                  className="text-[#DDC092] hover:text-lime-800 underline font-medium"
                >
                  codice fiscale inverso
                </a>
              </p>
            </div>

            {/* Footer Section */}
            <div className="text-center text-gray-700 space-y-3 pt-6 border-t-2 border-gray-100">
              <p className="text-base">
                Servizio offerto gratuitamente dalla{" "}
                <a
                  href="#"
                  className="text-[#DDC092] hover:text-lime-800 underline font-medium"
                >
                  intelliAM S.r.l.
                </a>{" "}
                Tutti i diritti riservati.
              </p>
              <p className="text-sm text-gray-600">
                In rari casi il codice generato non è quello assegnato dal
                Ministero delle Finanze.
              </p>
              <p className="text-sm text-gray-600">
                Il codice viene generato secondo le regole del D.M. del
                12/03/1974.
              </p>

              {/* Cookie Policy Link */}
              <div className="pt-4">
                <a
                  href="#"
                  className="text-[#DDC092] hover:text-lime-800 underline text-sm font-medium"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
