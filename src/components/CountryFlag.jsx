import turkey from 'flag-icons/flags/4x3/tr.svg';
import egypt from 'flag-icons/flags/4x3/eg.svg';
import uae from 'flag-icons/flags/4x3/ae.svg';
import thailand from 'flag-icons/flags/4x3/th.svg';
import indonesia from 'flag-icons/flags/4x3/id.svg';
import vietnam from 'flag-icons/flags/4x3/vn.svg';
import maldives from 'flag-icons/flags/4x3/mv.svg';
import sriLanka from 'flag-icons/flags/4x3/lk.svg';
import china from 'flag-icons/flags/4x3/cn.svg';
import greece from 'flag-icons/flags/4x3/gr.svg';
import italy from 'flag-icons/flags/4x3/it.svg';
import spain from 'flag-icons/flags/4x3/es.svg';
import georgia from 'flag-icons/flags/4x3/ge.svg';
import japan from 'flag-icons/flags/4x3/jp.svg';
import mauritius from 'flag-icons/flags/4x3/mu.svg';
import { Globe2 } from 'lucide-react';
const flags = {turkey, egypt, uae, thailand, indonesia, vietnam, maldives, 'sri-lanka':sriLanka, china, greece, italy, spain, georgia, japan, mauritius};
export function CountryFlag({country}) {
 return flags[country] ? <img className="country-flag" src={flags[country]} alt="" aria-hidden="true" width="24" height="18" /> : <Globe2 size={18} aria-hidden="true" />;
}
