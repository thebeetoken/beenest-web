import * as React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const AuthenticationHeader = () => (
  <Navbar className="fixed-top">
    <NavbarBrand
      href="/work"
      className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-default u-header__navbar-brand-text-white"
    >
    <div className="d-none d-lg-flex">
      <svg width="190px" height="36px" viewBox="0 0 190 36" fill="#fff">
        <path d="M180.806452,12.3129515 L180.806452,7.2 L184.06813,7.2 L184.06813,12.3129515 L189.687964,12.3129515 L189.687964,14.8694273 L184.06813,14.8694273 L184.06813,24.8078463 C184.06813,25.8644053 184.252306,26.6206133 184.622782,27.0764703 C184.992904,27.5323274 185.54791,27.7609912 186.288508,27.7609912 C187.167238,27.7609912 188.115034,27.4602726 189.132958,26.8603059 L190,29.4531767 C188.588932,30.3891541 187.15555,30.8571429 185.698792,30.8571429 C184.241326,30.8571429 183.061894,30.4068002 182.159788,29.5068502 C181.258036,28.6065325 180.806452,27.2441081 180.806452,25.4199446 L180.806452,14.8694273 L180.806452,12.3129515 Z M173.486367,15.417228 C172.556227,15.1407532 171.668269,15.0025159 170.820688,15.0025159 C169.831784,15.0025159 169.0372,15.1813076 168.436935,15.5385383 C167.836671,15.8954164 167.536719,16.4420182 167.536719,17.1786965 C167.536719,17.9164326 167.872002,18.4743191 168.542928,18.8541192 C169.214215,19.2339194 170.23196,19.6200671 171.597607,20.0115045 C172.892231,20.3796673 173.951437,20.7485354 174.775584,21.1166982 C175.59973,21.4852136 176.299498,22.0265258 176.875968,22.740282 C177.45316,23.4536855 177.741935,24.3980724 177.741935,25.5727374 C177.741935,27.2992939 177.076057,28.6121962 175.746462,29.5100338 C174.416506,30.4082241 172.762805,30.8571429 170.785357,30.8571429 C169.395556,30.8571429 168.048295,30.6388548 166.742134,30.200868 C165.435613,29.7635865 164.334587,29.141871 163.44086,28.3357215 L164.675999,25.9870968 C165.452918,26.677931 166.412259,27.2305279 167.554024,27.6448873 C168.696148,28.0595994 169.80799,28.2669555 170.89135,28.2669555 C171.973989,28.2669555 172.845724,28.0712367 173.504393,27.6794466 C174.163422,27.2876566 174.492937,26.6895684 174.492937,25.8834188 C174.492937,25.0543473 174.145396,24.4326318 173.451757,24.0182723 C172.757037,23.6039129 171.7036,23.1892007 170.291085,22.7748413 C169.042607,22.4296005 168.024501,22.0783648 167.236406,21.721134 C166.44759,21.3646086 165.776304,20.8405761 165.223628,20.1497419 C164.670591,19.4589077 164.393352,18.5610701 164.393352,17.4548185 C164.393352,15.7515367 165.028947,14.4735464 166.300138,13.6208475 C167.571689,12.7699119 169.161218,12.3428571 171.068004,12.3428571 C172.197871,12.3428571 173.310434,12.4990795 174.404609,12.8094083 C175.499867,13.1204423 176.447311,13.5411494 177.247303,14.0701189 L176.046774,16.5224216 C175.269855,16.0622181 174.416506,15.6933501 173.486367,15.417228 Z M148.584058,13.5361292 C150.018127,12.739797 151.654352,12.3428571 153.494922,12.3428571 C156.434216,12.3428571 158.65611,13.1784279 160.1617,14.8509707 C161.666195,16.5242143 162.419355,18.8490979 162.419355,21.8249209 C162.419355,22.2863241 162.407313,22.6324641 162.383594,22.8633409 L147.401772,22.8633409 C147.664138,24.5015501 148.375333,25.8044799 149.534265,26.7731814 C150.692832,27.7425836 152.120698,28.2271095 153.816767,28.2271095 C154.939938,28.2271095 155.986115,28.0316175 156.953473,27.6388817 C157.920831,27.2464963 158.763392,26.6933029 159.479696,25.9775499 L161.30786,27.8116014 C160.376263,28.7810036 159.252727,29.5303896 157.939076,30.061161 C156.624695,30.5922827 155.166543,30.8571429 153.566078,30.8571429 C151.702154,30.8571429 150.047684,30.4710636 148.602303,29.6982045 C147.155828,28.924995 146.033386,27.8354248 145.233154,26.4277421 C144.432192,25.0207601 144.032258,23.4165343 144.032258,21.6175172 C144.032258,19.8177994 144.432192,18.2202302 145.233154,16.8241089 C146.033386,15.4286882 147.150719,14.3321111 148.584058,13.5361292 Z M149.396332,16.3840766 C148.278999,17.3566319 147.612686,18.6651673 147.395934,20.3082812 L159.50451,20.3082812 C159.40854,18.6420445 158.831629,17.3279037 157.77487,16.3676105 C156.717016,15.4066165 155.324546,14.9262947 153.594176,14.9262947 C151.912338,14.9262947 150.512935,15.4125724 149.396332,16.3840766 Z M139.911375,14.2397995 C141.155293,15.5046647 141.989247,17.249539 141.989247,19.477265 L141.989247,30.8571429 L138.713487,30.8571429 L138.713487,20.3473927 C138.713487,18.7929587 138.272596,17.5803226 137.392251,16.7105501 C136.511906,15.8404224 135.296398,15.4051809 133.746444,15.4051809 C132.079255,15.4289859 130.722417,15.9566052 129.678446,16.9887494 C128.633396,18.0219595 128.040386,19.3610821 127.899416,21.0086045 L127.899416,30.8571429 L124.623656,30.8571429 L124.623656,12.4473151 L127.899416,12.4473151 L127.899416,15.8308293 C129.143694,13.2097872 131.29313,12.3894013 134.768838,12.3428571 C136.952438,12.3428571 138.666018,12.9749344 139.911375,14.2397995 Z M108.745439,13.5361292 C110.179536,12.739797 111.815793,12.3428571 113.656401,12.3428571 C116.595752,12.3428571 118.817691,13.1784279 120.322946,14.8509707 C121.8282,16.5242143 122.580645,18.8490979 122.580645,21.8249209 C122.580645,22.2863241 122.568968,22.6324641 122.545249,22.8633409 L107.562765,22.8633409 C107.8255,24.5015501 108.537075,25.8044799 109.695665,26.7731814 C110.854255,27.7425836 112.282149,28.2271095 113.978616,28.2271095 C115.10181,28.2271095 116.147643,28.0316175 117.115385,27.6388817 C118.082032,27.2464963 118.924974,26.6933029 119.641293,25.9775499 L121.469858,27.8116014 C120.537878,28.7810036 119.414319,29.5303896 118.100642,30.061161 C116.786236,30.5922827 115.328054,30.8571429 113.727558,30.8571429 C111.863961,30.8571429 110.209094,30.4710636 108.763684,29.6982045 C107.31718,28.924995 106.195081,27.8354248 105.394468,26.4277421 C104.593125,25.0207601 104.193548,23.4165343 104.193548,21.6175172 C104.193548,19.8177994 104.593125,18.2202302 105.394468,16.8241089 C106.195081,15.4286882 107.312071,14.3321111 108.745439,13.5361292 Z M109.557364,16.3840766 C108.440374,17.3566319 107.774048,18.6651673 107.557291,20.3082812 L119.666107,20.3082812 C119.570136,18.6420445 118.993213,17.3279037 117.936798,16.3676105 C116.878923,15.4066165 115.486425,14.9262947 113.756021,14.9262947 C112.07415,14.9262947 110.674719,15.4125724 109.557364,16.3840766 Z M88.3151504,13.5361292 C89.7491907,12.739797 91.3853833,12.3428571 93.2255525,12.3428571 C96.1651527,12.3428571 98.3873678,13.1784279 99.8921978,14.8509707 C101.397393,16.5242143 102.150538,18.8490979 102.150538,21.8249209 C102.150538,22.2863241 102.138131,22.6324641 102.114413,22.8633409 L87.1328882,22.8633409 C87.3952482,24.5015501 88.1064301,25.8044799 89.265339,26.7731814 C90.423883,27.7425836 91.8520849,28.2271095 93.5477555,28.2271095 C94.6712695,28.2271095 95.7170607,28.0316175 96.6847642,27.6388817 C97.6521028,27.2464963 98.4942822,26.6933029 99.2109375,25.9775499 L101.039065,27.8116014 C100.107121,28.7810036 98.9836074,29.5303896 97.6699827,30.061161 C96.3552634,30.5922827 94.8975048,30.8571429 93.297437,30.8571429 C91.4331846,30.8571429 89.7787473,30.4710636 88.3333952,29.6982045 C86.8869485,28.924995 85.7645291,27.8354248 84.9643128,26.4277421 C84.1633666,25.0207601 83.7634409,23.4165343 83.7634409,21.6175172 C83.7634409,19.8177994 84.1633666,18.2202302 84.9643128,16.8241089 C85.7645291,15.4286882 86.8818399,14.3321111 88.3151504,13.5361292 Z M89.1274084,16.3840766 C88.0104625,17.3566319 87.3437979,18.6651673 87.126685,20.3082812 L99.2350206,20.3082812 C99.1397828,18.6420445 98.5625177,17.3279037 97.5057796,16.3676105 C96.4486767,15.4066165 95.0555047,14.9262947 93.3251691,14.9262947 C91.6433646,14.9262947 90.2443543,15.4125724 89.1274084,16.3840766 Z M62.311828,5.14285714 L65.6354798,5.14285714 L65.6354798,16.5575046 C66.3267123,15.3135495 67.2746156,14.3568284 68.4773746,13.6866159 C69.6804967,13.0164034 71.0687703,12.6809345 72.6421954,12.6809345 C74.4051286,12.6809345 75.9774646,13.0878492 77.3599295,13.9016787 C78.7416684,14.7155082 79.8137322,15.8521131 80.576847,17.3114936 C81.3388727,18.7715994 81.7204301,20.4474934 81.7204301,22.3366367 C81.7204301,24.20402 81.3454075,25.8614178 80.5946361,27.3084675 C79.8445908,28.7573306 78.7830552,29.8816048 77.4132968,30.6834662 C76.0431753,31.4849649 74.4766479,31.8857143 72.7137147,31.8857143 C71.1170549,31.8857143 69.7106292,31.5509707 68.4958898,30.8807582 C67.2804243,30.2109084 66.3267123,29.2534619 65.6354798,28.0091442 L65.6354798,31.7780016 L62.311828,31.7780016 L62.311828,5.14285714 Z M69.3973237,28.1168569 C70.36229,28.6909621 71.4525059,28.9778334 72.6676084,28.9778334 C73.8827108,28.9778334 74.9729267,28.6909621 75.93753,28.1168569 C76.9032224,27.5423891 77.6536307,26.7408904 78.1905702,25.7112728 C78.7260576,24.6831059 78.9947088,23.5214767 78.9947088,22.2292867 C78.9947088,20.9613955 78.7202489,19.8128224 78.1720551,18.7832049 C77.6234982,17.7546753 76.8734529,16.9520885 75.920467,16.378346 C74.966755,15.8035155 73.8827108,15.5162816 72.6676084,15.5162816 C71.4525059,15.5162816 70.36229,15.8035155 69.3973237,16.378346 C68.4319943,16.9520885 67.6757773,17.7546753 67.1275835,18.7832049 C66.5790267,19.8128224 66.3049298,20.9613955 66.3049298,22.2292867 C66.3049298,23.5457755 66.5790267,24.7128447 67.1275835,25.7290436 C67.6757773,26.7470557 68.4319943,27.5423891 69.3973237,28.1168569 Z M10.2150538,18.2529086 L31.155914,6.17142857 L52.0967742,18.2529086 L52.0967742,36 L31.155914,23.9192498 L31.155914,12.2121686 L15.4502688,21.2732786 L15.4502688,32.9807247 L10.2150538,36 L10.2150538,18.2529086 Z M0,11.7271867 L20.4568916,0 L25.5376344,2.93294846 L5.11440194,14.6583632 L5.10938888,31.8857143 L0,28.9545378 L0,11.7271867 Z" />
      </svg>
    </div>
    <div className="d-lg-none">
      <svg width="190px" height="36px" viewBox="0 0 190 36" fill="#377dff">
        <path d="M180.806452,12.3129515 L180.806452,7.2 L184.06813,7.2 L184.06813,12.3129515 L189.687964,12.3129515 L189.687964,14.8694273 L184.06813,14.8694273 L184.06813,24.8078463 C184.06813,25.8644053 184.252306,26.6206133 184.622782,27.0764703 C184.992904,27.5323274 185.54791,27.7609912 186.288508,27.7609912 C187.167238,27.7609912 188.115034,27.4602726 189.132958,26.8603059 L190,29.4531767 C188.588932,30.3891541 187.15555,30.8571429 185.698792,30.8571429 C184.241326,30.8571429 183.061894,30.4068002 182.159788,29.5068502 C181.258036,28.6065325 180.806452,27.2441081 180.806452,25.4199446 L180.806452,14.8694273 L180.806452,12.3129515 Z M173.486367,15.417228 C172.556227,15.1407532 171.668269,15.0025159 170.820688,15.0025159 C169.831784,15.0025159 169.0372,15.1813076 168.436935,15.5385383 C167.836671,15.8954164 167.536719,16.4420182 167.536719,17.1786965 C167.536719,17.9164326 167.872002,18.4743191 168.542928,18.8541192 C169.214215,19.2339194 170.23196,19.6200671 171.597607,20.0115045 C172.892231,20.3796673 173.951437,20.7485354 174.775584,21.1166982 C175.59973,21.4852136 176.299498,22.0265258 176.875968,22.740282 C177.45316,23.4536855 177.741935,24.3980724 177.741935,25.5727374 C177.741935,27.2992939 177.076057,28.6121962 175.746462,29.5100338 C174.416506,30.4082241 172.762805,30.8571429 170.785357,30.8571429 C169.395556,30.8571429 168.048295,30.6388548 166.742134,30.200868 C165.435613,29.7635865 164.334587,29.141871 163.44086,28.3357215 L164.675999,25.9870968 C165.452918,26.677931 166.412259,27.2305279 167.554024,27.6448873 C168.696148,28.0595994 169.80799,28.2669555 170.89135,28.2669555 C171.973989,28.2669555 172.845724,28.0712367 173.504393,27.6794466 C174.163422,27.2876566 174.492937,26.6895684 174.492937,25.8834188 C174.492937,25.0543473 174.145396,24.4326318 173.451757,24.0182723 C172.757037,23.6039129 171.7036,23.1892007 170.291085,22.7748413 C169.042607,22.4296005 168.024501,22.0783648 167.236406,21.721134 C166.44759,21.3646086 165.776304,20.8405761 165.223628,20.1497419 C164.670591,19.4589077 164.393352,18.5610701 164.393352,17.4548185 C164.393352,15.7515367 165.028947,14.4735464 166.300138,13.6208475 C167.571689,12.7699119 169.161218,12.3428571 171.068004,12.3428571 C172.197871,12.3428571 173.310434,12.4990795 174.404609,12.8094083 C175.499867,13.1204423 176.447311,13.5411494 177.247303,14.0701189 L176.046774,16.5224216 C175.269855,16.0622181 174.416506,15.6933501 173.486367,15.417228 Z M148.584058,13.5361292 C150.018127,12.739797 151.654352,12.3428571 153.494922,12.3428571 C156.434216,12.3428571 158.65611,13.1784279 160.1617,14.8509707 C161.666195,16.5242143 162.419355,18.8490979 162.419355,21.8249209 C162.419355,22.2863241 162.407313,22.6324641 162.383594,22.8633409 L147.401772,22.8633409 C147.664138,24.5015501 148.375333,25.8044799 149.534265,26.7731814 C150.692832,27.7425836 152.120698,28.2271095 153.816767,28.2271095 C154.939938,28.2271095 155.986115,28.0316175 156.953473,27.6388817 C157.920831,27.2464963 158.763392,26.6933029 159.479696,25.9775499 L161.30786,27.8116014 C160.376263,28.7810036 159.252727,29.5303896 157.939076,30.061161 C156.624695,30.5922827 155.166543,30.8571429 153.566078,30.8571429 C151.702154,30.8571429 150.047684,30.4710636 148.602303,29.6982045 C147.155828,28.924995 146.033386,27.8354248 145.233154,26.4277421 C144.432192,25.0207601 144.032258,23.4165343 144.032258,21.6175172 C144.032258,19.8177994 144.432192,18.2202302 145.233154,16.8241089 C146.033386,15.4286882 147.150719,14.3321111 148.584058,13.5361292 Z M149.396332,16.3840766 C148.278999,17.3566319 147.612686,18.6651673 147.395934,20.3082812 L159.50451,20.3082812 C159.40854,18.6420445 158.831629,17.3279037 157.77487,16.3676105 C156.717016,15.4066165 155.324546,14.9262947 153.594176,14.9262947 C151.912338,14.9262947 150.512935,15.4125724 149.396332,16.3840766 Z M139.911375,14.2397995 C141.155293,15.5046647 141.989247,17.249539 141.989247,19.477265 L141.989247,30.8571429 L138.713487,30.8571429 L138.713487,20.3473927 C138.713487,18.7929587 138.272596,17.5803226 137.392251,16.7105501 C136.511906,15.8404224 135.296398,15.4051809 133.746444,15.4051809 C132.079255,15.4289859 130.722417,15.9566052 129.678446,16.9887494 C128.633396,18.0219595 128.040386,19.3610821 127.899416,21.0086045 L127.899416,30.8571429 L124.623656,30.8571429 L124.623656,12.4473151 L127.899416,12.4473151 L127.899416,15.8308293 C129.143694,13.2097872 131.29313,12.3894013 134.768838,12.3428571 C136.952438,12.3428571 138.666018,12.9749344 139.911375,14.2397995 Z M108.745439,13.5361292 C110.179536,12.739797 111.815793,12.3428571 113.656401,12.3428571 C116.595752,12.3428571 118.817691,13.1784279 120.322946,14.8509707 C121.8282,16.5242143 122.580645,18.8490979 122.580645,21.8249209 C122.580645,22.2863241 122.568968,22.6324641 122.545249,22.8633409 L107.562765,22.8633409 C107.8255,24.5015501 108.537075,25.8044799 109.695665,26.7731814 C110.854255,27.7425836 112.282149,28.2271095 113.978616,28.2271095 C115.10181,28.2271095 116.147643,28.0316175 117.115385,27.6388817 C118.082032,27.2464963 118.924974,26.6933029 119.641293,25.9775499 L121.469858,27.8116014 C120.537878,28.7810036 119.414319,29.5303896 118.100642,30.061161 C116.786236,30.5922827 115.328054,30.8571429 113.727558,30.8571429 C111.863961,30.8571429 110.209094,30.4710636 108.763684,29.6982045 C107.31718,28.924995 106.195081,27.8354248 105.394468,26.4277421 C104.593125,25.0207601 104.193548,23.4165343 104.193548,21.6175172 C104.193548,19.8177994 104.593125,18.2202302 105.394468,16.8241089 C106.195081,15.4286882 107.312071,14.3321111 108.745439,13.5361292 Z M109.557364,16.3840766 C108.440374,17.3566319 107.774048,18.6651673 107.557291,20.3082812 L119.666107,20.3082812 C119.570136,18.6420445 118.993213,17.3279037 117.936798,16.3676105 C116.878923,15.4066165 115.486425,14.9262947 113.756021,14.9262947 C112.07415,14.9262947 110.674719,15.4125724 109.557364,16.3840766 Z M88.3151504,13.5361292 C89.7491907,12.739797 91.3853833,12.3428571 93.2255525,12.3428571 C96.1651527,12.3428571 98.3873678,13.1784279 99.8921978,14.8509707 C101.397393,16.5242143 102.150538,18.8490979 102.150538,21.8249209 C102.150538,22.2863241 102.138131,22.6324641 102.114413,22.8633409 L87.1328882,22.8633409 C87.3952482,24.5015501 88.1064301,25.8044799 89.265339,26.7731814 C90.423883,27.7425836 91.8520849,28.2271095 93.5477555,28.2271095 C94.6712695,28.2271095 95.7170607,28.0316175 96.6847642,27.6388817 C97.6521028,27.2464963 98.4942822,26.6933029 99.2109375,25.9775499 L101.039065,27.8116014 C100.107121,28.7810036 98.9836074,29.5303896 97.6699827,30.061161 C96.3552634,30.5922827 94.8975048,30.8571429 93.297437,30.8571429 C91.4331846,30.8571429 89.7787473,30.4710636 88.3333952,29.6982045 C86.8869485,28.924995 85.7645291,27.8354248 84.9643128,26.4277421 C84.1633666,25.0207601 83.7634409,23.4165343 83.7634409,21.6175172 C83.7634409,19.8177994 84.1633666,18.2202302 84.9643128,16.8241089 C85.7645291,15.4286882 86.8818399,14.3321111 88.3151504,13.5361292 Z M89.1274084,16.3840766 C88.0104625,17.3566319 87.3437979,18.6651673 87.126685,20.3082812 L99.2350206,20.3082812 C99.1397828,18.6420445 98.5625177,17.3279037 97.5057796,16.3676105 C96.4486767,15.4066165 95.0555047,14.9262947 93.3251691,14.9262947 C91.6433646,14.9262947 90.2443543,15.4125724 89.1274084,16.3840766 Z M62.311828,5.14285714 L65.6354798,5.14285714 L65.6354798,16.5575046 C66.3267123,15.3135495 67.2746156,14.3568284 68.4773746,13.6866159 C69.6804967,13.0164034 71.0687703,12.6809345 72.6421954,12.6809345 C74.4051286,12.6809345 75.9774646,13.0878492 77.3599295,13.9016787 C78.7416684,14.7155082 79.8137322,15.8521131 80.576847,17.3114936 C81.3388727,18.7715994 81.7204301,20.4474934 81.7204301,22.3366367 C81.7204301,24.20402 81.3454075,25.8614178 80.5946361,27.3084675 C79.8445908,28.7573306 78.7830552,29.8816048 77.4132968,30.6834662 C76.0431753,31.4849649 74.4766479,31.8857143 72.7137147,31.8857143 C71.1170549,31.8857143 69.7106292,31.5509707 68.4958898,30.8807582 C67.2804243,30.2109084 66.3267123,29.2534619 65.6354798,28.0091442 L65.6354798,31.7780016 L62.311828,31.7780016 L62.311828,5.14285714 Z M69.3973237,28.1168569 C70.36229,28.6909621 71.4525059,28.9778334 72.6676084,28.9778334 C73.8827108,28.9778334 74.9729267,28.6909621 75.93753,28.1168569 C76.9032224,27.5423891 77.6536307,26.7408904 78.1905702,25.7112728 C78.7260576,24.6831059 78.9947088,23.5214767 78.9947088,22.2292867 C78.9947088,20.9613955 78.7202489,19.8128224 78.1720551,18.7832049 C77.6234982,17.7546753 76.8734529,16.9520885 75.920467,16.378346 C74.966755,15.8035155 73.8827108,15.5162816 72.6676084,15.5162816 C71.4525059,15.5162816 70.36229,15.8035155 69.3973237,16.378346 C68.4319943,16.9520885 67.6757773,17.7546753 67.1275835,18.7832049 C66.5790267,19.8128224 66.3049298,20.9613955 66.3049298,22.2292867 C66.3049298,23.5457755 66.5790267,24.7128447 67.1275835,25.7290436 C67.6757773,26.7470557 68.4319943,27.5423891 69.3973237,28.1168569 Z M10.2150538,18.2529086 L31.155914,6.17142857 L52.0967742,18.2529086 L52.0967742,36 L31.155914,23.9192498 L31.155914,12.2121686 L15.4502688,21.2732786 L15.4502688,32.9807247 L10.2150538,36 L10.2150538,18.2529086 Z M0,11.7271867 L20.4568916,0 L25.5376344,2.93294846 L5.11440194,14.6583632 L5.10938888,31.8857143 L0,28.9545378 L0,11.7271867 Z" />
      </svg>
    </div>
    </NavbarBrand>
  </Navbar>
);

export default AuthenticationHeader;