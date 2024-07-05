import React from "react";

const Data = ({ strokeColor, width, height }) => {
  return (
    <div className="mt-[-4px]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.6673 16C26.6673 18.9455 21.8917 21.3333 16.0007 21.3333C10.1096 21.3333 5.33398 18.9455 5.33398 16"
          stroke={strokeColor}
          stroke-width="2"
        />
        <path
          d="M5.33301 24V8"
          stroke={strokeColor}
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M26.667 8V24"
          stroke={strokeColor}
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M15.9997 13.3334C21.8907 13.3334 26.6663 10.9456 26.6663 8.00008C26.6663 5.05456 21.8907 2.66675 15.9997 2.66675C10.1086 2.66675 5.33301 5.05456 5.33301 8.00008C5.33301 10.9456 10.1086 13.3334 15.9997 13.3334Z"
          stroke={strokeColor}
          stroke-width="2"
        />
        <path
          d="M26.6663 24C26.6663 26.9455 21.8907 29.3333 15.9997 29.3333C10.1086 29.3333 5.33301 26.9455 5.33301 24"
          stroke={strokeColor}
          stroke-width="2"
        />
      </svg>
    </div>
  );
};

const Wire = ({ strokeColor, width, height }) => {
  return (
    <div className="mt-[-4px]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.063 29.1195C12.2674 29.1195 9.75736 28.3771 7.59176 26.9079C4.24576 24.6383 2.30616 21.5095 1.82656 17.6087C1.55736 15.4175 1.77096 13.3455 2.46176 11.4495C3.14656 9.56953 4.30856 7.84193 5.91496 6.31473C7.92536 4.40353 10.3822 3.25273 13.217 2.89473C15.931 2.55193 18.5498 3.02713 21.0006 4.30713C21.0958 4.35673 21.1822 4.40673 21.2582 4.45073C21.2862 4.46673 21.3134 4.48273 21.339 4.49713L22.0918 4.92193L21.7802 5.72833C21.7162 5.89393 21.651 6.05233 21.5878 6.20593C21.4642 6.50633 21.3474 6.78993 21.2686 7.06113C20.8438 8.52313 21.1742 9.82753 22.279 11.0483C22.6238 11.4295 22.7418 11.8679 22.6294 12.3507C22.299 13.7695 22.1062 15.3063 22.0046 17.3339C22.0002 17.4211 21.9894 17.4959 21.9818 17.5503C21.9798 17.5639 21.9778 17.5779 21.9762 17.5919L21.8526 18.5943L20.8514 18.4611C20.741 18.4463 20.6322 18.4303 20.5242 18.4143C20.315 18.3831 20.117 18.3539 19.9326 18.3399C19.3534 18.2967 18.9014 18.4695 18.5086 18.8843C17.7382 19.6975 17.537 20.6243 17.8758 21.8007C18.019 22.2975 18.2046 22.7875 18.4014 23.3059C18.547 23.6899 18.6978 24.0871 18.8322 24.4935C19.0322 25.0983 19.1602 25.6507 19.2242 26.1827C19.3326 27.0855 18.9038 27.9051 18.047 28.4315C17.385 28.8383 16.637 29.0639 15.8238 29.1023C15.5682 29.1143 15.3146 29.1203 15.0634 29.1203L15.063 29.1195ZM14.9038 4.78753C14.4286 4.78753 13.9502 4.81793 13.4674 4.87873C11.065 5.18233 8.98736 6.15273 7.29296 7.76393C4.52336 10.3967 3.35216 13.6267 3.81176 17.3643C4.21776 20.6671 5.86736 23.3211 8.71456 25.2523C10.7374 26.6243 13.0322 27.2299 15.7298 27.1031C16.2082 27.0807 16.6234 26.9575 16.9994 26.7263C17.2558 26.5687 17.2446 26.4759 17.2382 26.4203C17.191 26.0275 17.0882 25.5903 16.933 25.1203C16.8122 24.7551 16.6758 24.3951 16.5314 24.0143C16.329 23.4807 16.1198 22.9291 15.9542 22.3531C15.4226 20.5059 15.8038 18.8307 17.0574 17.5079C17.8566 16.6643 18.8942 16.2619 20.0602 16.3431C20.1694 14.7399 20.347 13.4207 20.6174 12.1843C19.9518 11.3975 19.4982 10.5535 19.2682 9.67233C19.0042 8.66113 19.0314 7.59433 19.3486 6.50233C19.4158 6.27073 19.4962 6.04993 19.5802 5.83553C18.083 5.13833 16.5166 4.78753 14.9042 4.78753H14.9038ZM20.7946 12.3883C20.7946 12.3883 20.7958 12.3895 20.7962 12.3899C20.7962 12.3899 20.7954 12.3887 20.795 12.3883H20.7946Z"
          fill={strokeColor}
        />
        <path
          d="M26.8719 29.1117C26.8631 29.1117 26.8547 29.1117 26.8459 29.1117C26.1299 29.1021 25.4679 28.6933 25.0295 27.9901C24.7239 27.5001 24.4723 26.9141 24.2595 26.1993C23.9319 25.0981 23.7471 23.8853 23.6939 22.4909C23.6351 20.9449 23.6179 19.3605 23.6431 17.7825C23.6635 16.4929 23.8147 15.1821 24.1047 13.7753L24.3439 12.6145L25.4479 13.0457C26.4235 13.4269 27.3383 13.4253 28.3267 13.0405L29.4867 12.5889L29.6775 13.8193C29.7039 13.9885 29.7307 14.1549 29.7579 14.3197C29.8163 14.6777 29.8767 15.0481 29.9227 15.4197C30.1767 17.4673 30.2415 19.6217 30.1155 21.8233C30.0255 23.3973 29.8923 25.0701 29.3523 26.6913C29.1879 27.1845 28.9743 27.6317 28.7179 28.0197C28.2579 28.7153 27.5863 29.1121 26.8719 29.1121V29.1117ZM25.8711 15.2365C25.7315 16.1261 25.6563 16.9769 25.6431 17.8145C25.6187 19.3569 25.6351 20.9045 25.6927 22.4149C25.7391 23.6393 25.8975 24.6909 26.1767 25.6289C26.3375 26.1697 26.5175 26.5961 26.7271 26.9321C26.7939 27.0389 26.8483 27.0857 26.8751 27.1037C26.9091 27.0833 26.9751 27.0289 27.0499 26.9157C27.2075 26.6773 27.3475 26.3809 27.4551 26.0585C27.9183 24.6689 28.0335 23.2081 28.1191 21.7085C28.2379 19.6269 28.1771 17.5937 27.9379 15.6653C27.9203 15.5233 27.9003 15.3809 27.8787 15.2369C27.2087 15.3565 26.5383 15.3565 25.8711 15.2361V15.2365Z"
          fill={strokeColor}
        />
        <path
          d="M26.8917 12.3535C26.2445 12.3535 25.5941 12.1851 24.9653 11.8471C23.5857 11.1051 22.8265 9.82234 22.8281 8.23514C22.8281 7.85554 22.9045 7.44714 23.0485 7.05394C23.6141 5.50874 24.5721 4.24834 25.8969 3.30754C26.4481 2.91594 27.0001 2.71474 27.5841 2.69194L28.4913 2.65674L28.6137 3.55634C28.6237 3.63074 28.6325 3.70394 28.6409 3.77594C28.6561 3.90394 28.6693 4.01474 28.6885 4.10834C28.7445 4.37594 28.8897 4.63234 29.1317 4.89194C29.3369 5.11154 29.5757 5.36594 29.8157 5.60314C30.6389 6.41634 31.0337 7.49794 30.9269 8.64874C30.8161 9.84314 30.1649 10.9511 29.1845 11.6135C28.4553 12.1059 27.6761 12.3535 26.8913 12.3535H26.8917ZM26.8937 5.05714C25.9885 5.74554 25.3273 6.64754 24.9269 7.74154C24.8633 7.91514 24.8285 8.09114 24.8281 8.23714C24.8273 9.09994 25.1721 9.68754 25.9129 10.0859C26.6577 10.4867 27.3417 10.4455 28.0657 9.95634C28.5473 9.63114 28.8809 9.05914 28.9361 8.46434C28.9717 8.08034 28.9097 7.51874 28.4109 7.02634C28.1441 6.76314 27.8889 6.49114 27.6701 6.25674C27.3221 5.88394 27.0621 5.48194 26.8937 5.05714Z"
          fill={strokeColor}
        />
        <path
          d="M13.8811 12.0619H13.8759C13.1251 12.0607 12.4211 11.7675 11.8939 11.2367C11.3671 10.7063 11.0775 10.0007 11.0791 9.24913C11.0807 8.49753 11.3727 7.79313 11.9015 7.26553C12.4295 6.73873 13.1327 6.44873 13.8819 6.44873H13.8871C14.6367 6.44993 15.3415 6.74473 15.8723 7.27793C16.4019 7.81033 16.6923 8.51513 16.6895 9.26193C16.6843 10.8067 15.4247 12.0615 13.8807 12.0615L13.8811 12.0619ZM13.8823 8.04873C13.2087 8.04873 12.6807 8.57713 12.6791 9.25233C12.6783 9.57713 12.8027 9.88113 13.0287 10.1087C13.2543 10.3359 13.5563 10.4611 13.8787 10.4619H13.8807C14.5451 10.4619 15.0875 9.92153 15.0895 9.25673C15.0907 8.93753 14.9659 8.63593 14.7379 8.40673C14.5091 8.17673 14.2059 8.04953 13.8843 8.04913H13.8819L13.8823 8.04873Z"
          fill={strokeColor}
        />
        <path
          d="M8.24018 17.3799H8.23178C6.68498 17.3755 5.43018 16.1123 5.43458 14.5639C5.43658 13.8147 5.73098 13.1111 6.26338 12.5827C6.79338 12.0567 7.49578 11.7671 8.24178 11.7671C8.24458 11.7671 8.24778 11.7671 8.25058 11.7671C9.79738 11.7719 11.0522 13.0347 11.0478 14.5827C11.0458 15.3315 10.7514 16.0351 10.219 16.5639C9.68898 17.0903 8.98658 17.3799 8.24018 17.3799ZM8.24218 13.3675C7.92138 13.3675 7.61898 13.4923 7.39098 13.7187C7.16218 13.9459 7.03578 14.2479 7.03498 14.5687C7.03298 15.2347 7.57218 15.7783 8.23698 15.7803H8.24058C8.56138 15.7803 8.86378 15.6555 9.09218 15.4291C9.32098 15.2019 9.44778 14.8999 9.44858 14.5787C9.45058 13.9131 8.91138 13.3699 8.24658 13.3679H8.24298L8.24218 13.3675Z"
          fill={strokeColor}
        />
        <path
          d="M10.5644 24.1989C9.81805 24.1989 9.11565 23.9089 8.58525 23.3821C8.05285 22.8533 7.75885 22.1497 7.75685 21.4005C7.75485 20.6513 8.04485 19.9457 8.57365 19.4137C9.10245 18.8813 9.80645 18.5873 10.5552 18.5857H10.5616C12.1064 18.5857 13.3656 19.8393 13.37 21.3829C13.372 22.1321 13.082 22.8377 12.5536 23.3697C12.0248 23.9021 11.3212 24.1961 10.572 24.1981H10.5644V24.1989ZM10.5616 20.1861H10.5588C10.2376 20.1869 9.93565 20.3133 9.70845 20.5417C9.48085 20.7709 9.35605 21.0745 9.35685 21.3965C9.35765 21.7177 9.48405 22.0197 9.71285 22.2469C9.94125 22.4737 10.2436 22.5985 10.5644 22.5985H10.5676C10.8888 22.5977 11.1908 22.4713 11.4184 22.2421C11.646 22.0129 11.7708 21.7093 11.77 21.3873C11.768 20.7241 11.226 20.1853 10.5612 20.1853L10.5616 20.1861Z"
          fill={strokeColor}
        />
      </svg>
    </div>
  );
};

const Connect = ({ strokeColor, width, height }) => {
  return (
    <div className="mt-[-4px]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.66699 10.6667C8.87613 10.6667 10.667 8.87589 10.667 6.66675C10.667 4.45761 8.87613 2.66675 6.66699 2.66675C4.45785 2.66675 2.66699 4.45761 2.66699 6.66675C2.66699 8.87589 4.45785 10.6667 6.66699 10.6667Z"
          stroke={strokeColor}
          stroke-width="2"
        />
        <path
          d="M25.333 29.3333C27.5421 29.3333 29.333 27.5424 29.333 25.3333C29.333 23.1241 27.5421 21.3333 25.333 21.3333C23.1239 21.3333 21.333 23.1241 21.333 25.3333C21.333 27.5424 23.1239 29.3333 25.333 29.3333Z"
          stroke={strokeColor}
          stroke-width="2"
        />
        <mask id="path-3-inside-1_156_1442" fill="{strokeColor}">
          <path d="M14.6665 5.66675C14.1142 5.66675 13.6665 6.11447 13.6665 6.66675C13.6665 7.21903 14.1142 7.66675 14.6665 7.66675V5.66675ZM17.3332 25.3334L18.0402 26.0405C18.4308 25.6499 18.4308 25.0169 18.0402 24.6263L17.3332 25.3334ZM16.0402 22.6263C15.6497 22.2358 15.0165 22.2358 14.626 22.6263C14.2356 23.0169 14.2356 23.6499 14.626 24.0405L16.0402 22.6263ZM14.626 26.6263C14.2356 27.0169 14.2356 27.6499 14.626 28.0405C15.0165 28.431 15.6497 28.431 16.0402 28.0405L14.626 26.6263ZM21.509 5.66675H14.6665V7.66675H21.509V5.66675ZM17.3332 24.3334H10.4906V26.3334H17.3332V24.3334ZM22.4038 10.7395L8.52209 19.5733L9.59584 21.2606L23.4776 12.4268L22.4038 10.7395ZM18.0402 24.6263L16.0402 22.6263L14.626 24.0405L16.626 26.0405L18.0402 24.6263ZM16.626 24.6263L14.626 26.6263L16.0402 28.0405L18.0402 26.0405L16.626 24.6263ZM10.4906 24.3334C8.82323 24.3334 8.18911 22.1558 9.59584 21.2606L8.52209 19.5733C5.42729 21.5427 6.82231 26.3334 10.4906 26.3334V24.3334ZM21.509 7.66675C23.1764 7.66675 23.8105 9.84432 22.4038 10.7395L23.4776 12.4268C26.5724 10.4574 25.1773 5.66675 21.509 5.66675V7.66675Z" />
        </mask>
        <path
          d="M14.6665 5.66675C14.1142 5.66675 13.6665 6.11447 13.6665 6.66675C13.6665 7.21903 14.1142 7.66675 14.6665 7.66675V5.66675ZM17.3332 25.3334L18.0402 26.0405C18.4308 25.6499 18.4308 25.0169 18.0402 24.6263L17.3332 25.3334ZM16.0402 22.6263C15.6497 22.2358 15.0165 22.2358 14.626 22.6263C14.2356 23.0169 14.2356 23.6499 14.626 24.0405L16.0402 22.6263ZM14.626 26.6263C14.2356 27.0169 14.2356 27.6499 14.626 28.0405C15.0165 28.431 15.6497 28.431 16.0402 28.0405L14.626 26.6263ZM21.509 5.66675H14.6665V7.66675H21.509V5.66675ZM17.3332 24.3334H10.4906V26.3334H17.3332V24.3334ZM22.4038 10.7395L8.52209 19.5733L9.59584 21.2606L23.4776 12.4268L22.4038 10.7395ZM18.0402 24.6263L16.0402 22.6263L14.626 24.0405L16.626 26.0405L18.0402 24.6263ZM16.626 24.6263L14.626 26.6263L16.0402 28.0405L18.0402 26.0405L16.626 24.6263ZM10.4906 24.3334C8.82323 24.3334 8.18911 22.1558 9.59584 21.2606L8.52209 19.5733C5.42729 21.5427 6.82231 26.3334 10.4906 26.3334V24.3334ZM21.509 7.66675C23.1764 7.66675 23.8105 9.84432 22.4038 10.7395L23.4776 12.4268C26.5724 10.4574 25.1773 5.66675 21.509 5.66675V7.66675Z"
          fill={strokeColor}
        />
        <path
          d="M23.4776 12.4268L22.9151 12.7848L24.04 12.0689L23.4776 12.4268ZM9.59584 21.2606L9.03341 21.6186L10.1583 20.9027L9.59584 21.2606ZM15.3332 7.66675V5.66675H13.9998V7.66675H15.3332ZM22.3782 11.9411L22.9151 12.7848L24.04 12.0689L23.5031 11.2252L22.3782 11.9411ZM8.49653 20.775L9.03341 21.6186L10.1583 20.9027L9.62139 20.0591L8.49653 20.775ZM15.0974 24.5119L16.5116 23.0978L15.5689 22.1549L14.1546 23.5691L15.0974 24.5119ZM16.5116 27.5691L15.0974 26.1549L14.1546 27.0978L15.5689 28.5119L16.5116 27.5691ZM22.1757 7.66675V5.66675H20.8424V7.66675H22.1757ZM9.82396 24.3334V26.3334H11.1573V24.3334H9.82396ZM7.95965 19.9312L9.0334 21.6185L10.1583 20.9027L9.08454 19.2154L7.95965 19.9312ZM24.04 12.0689L22.9663 10.3816L21.8414 11.0974L22.9151 12.7848L24.04 12.0689ZM17.3332 25.3334L16.3904 24.3906L15.4476 25.3334L16.3904 26.2762L17.3332 25.3334ZM23.4776 12.4268L24.1934 13.5517L24.1934 13.5517L23.4776 12.4268ZM9.59584 21.2606L8.88001 20.1357L8.88 20.1357L9.59584 21.2606ZM14.626 22.6263L13.6832 21.6835L13.683 21.6837L14.626 22.6263ZM14.626 24.0405L13.683 24.9831L13.6832 24.9833L14.626 24.0405ZM14.626 26.6263L13.6832 25.6835L13.683 25.6837L14.626 26.6263ZM14.626 28.0405L13.683 28.9831L13.6832 28.9833L14.626 28.0405ZM17.3332 24.3334H18.6665V23.0001H17.3332V24.3334ZM17.3332 26.3334V27.6667H18.6665V26.3334H17.3332ZM22.4038 10.7395L23.1197 11.8644L23.1197 11.8644L22.4038 10.7395ZM8.52209 19.5733L7.80626 18.4484L7.80625 18.4484L8.52209 19.5733ZM16.626 26.0405L15.6832 26.9833L16.6259 27.9261L17.5687 26.9833L16.626 26.0405ZM16.626 24.6263L17.5687 23.6835L16.6259 22.7408L15.6832 23.6835L16.626 24.6263ZM14.6665 4.33341C13.3779 4.33341 12.3332 5.37808 12.3332 6.66675H14.9998C14.9998 6.85086 14.8506 7.00008 14.6665 7.00008V4.33341ZM12.3332 6.66675C12.3332 7.95542 13.3779 9.00008 14.6665 9.00008V6.33341C14.8506 6.33341 14.9998 6.48264 14.9998 6.66675H12.3332ZM16.3904 26.2762L17.0974 26.9833L18.983 25.0977L18.276 24.3906L16.3904 26.2762ZM18.983 26.9833C19.8943 26.0721 19.8943 24.5948 18.983 23.6835L17.0974 25.5692C16.9673 25.439 16.9673 25.2278 17.0974 25.0977L18.983 26.9833ZM17.0974 23.6835L16.3904 24.3906L18.276 26.2762L18.983 25.5692L17.0974 23.6835ZM16.983 21.6835C16.0718 20.7723 14.5944 20.7723 13.6832 21.6835L15.5688 23.5692C15.4386 23.6993 15.2276 23.6993 15.0974 23.5692L16.983 21.6835ZM13.683 21.6837C12.7721 22.5949 12.7721 24.0719 13.683 24.9831L15.5689 23.0978C15.699 23.228 15.699 23.4389 15.5689 23.569L13.683 21.6837ZM13.683 25.6837C12.7721 26.5949 12.7721 28.0719 13.683 28.9831L15.5689 27.0978C15.699 27.228 15.699 27.4389 15.5689 27.569L13.683 25.6837ZM13.6832 28.9833C14.5944 29.8945 16.0718 29.8945 16.983 28.9833L15.0974 27.0977C15.2276 26.9675 15.4386 26.9675 15.5688 27.0977L13.6832 28.9833ZM21.509 4.33341H14.6665V7.00008H21.509V4.33341ZM14.6665 9.00008H21.509V6.33341H14.6665V9.00008ZM17.3332 23.0001H10.4906V25.6667H17.3332V23.0001ZM10.4906 27.6667H17.3332V25.0001H10.4906V27.6667ZM18.6665 26.3334V24.3334H15.9998V26.3334H18.6665ZM21.688 9.61464L7.80626 18.4484L9.23792 20.6982L23.1197 11.8644L21.688 9.61464ZM10.3117 22.3855L24.1934 13.5517L22.7617 11.302L8.88001 20.1357L10.3117 22.3855ZM18.983 23.6835L16.983 21.6835L15.0974 23.5692L17.0974 25.5692L18.983 23.6835ZM13.6832 24.9833L15.6832 26.9833L17.5688 25.0977L15.5688 23.0977L13.6832 24.9833ZM17.5687 26.9833L18.983 25.5692L17.0975 23.6835L15.6832 25.0976L17.5687 26.9833ZM15.6832 23.6835L13.6832 25.6835L15.5688 27.5692L17.5688 25.5692L15.6832 23.6835ZM16.983 28.9833L18.983 26.9833L17.0974 25.0977L15.0974 27.0977L16.983 28.9833ZM18.983 25.0976L17.5687 23.6835L15.6832 25.5692L17.0975 26.9833L18.983 25.0976ZM10.4906 23.0001C10.3778 23.0001 10.3197 22.9679 10.2838 22.9391C10.2389 22.9031 10.1945 22.8421 10.1706 22.7599C10.1467 22.6777 10.1514 22.6025 10.1699 22.548C10.1847 22.5045 10.2165 22.4461 10.3117 22.3855L8.88 20.1357C6.34791 21.7471 7.48927 25.6667 10.4906 25.6667V23.0001ZM7.80625 18.4484C3.58613 21.134 5.48832 27.6667 10.4906 27.6667V25.0001C8.15629 25.0001 7.26846 21.9515 9.23794 20.6982L7.80625 18.4484ZM21.509 9.00008C21.6218 9.00008 21.6799 9.0323 21.7158 9.06105C21.7607 9.09707 21.8051 9.15801 21.829 9.24022C21.853 9.32243 21.8482 9.39769 21.8297 9.4522C21.8149 9.4957 21.7831 9.55409 21.688 9.61466L23.1197 11.8644C25.6517 10.253 24.5103 6.33341 21.509 6.33341V9.00008ZM24.1934 13.5517C28.4136 10.8661 26.5112 4.33341 21.509 4.33341V7.00008C23.8434 7.00008 24.7312 10.0487 22.7617 11.302L24.1934 13.5517Z"
          fill={strokeColor}
          mask="url(#path-3-inside-1_156_1442)"
        />
      </svg>
    </div>
  );
};

const Sheild = ({ strokeColor, width, height }) => {
  return (
    <div className="mt-[-4px]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13.889C4 9.62551 4 7.49379 4.50336 6.77663C5.00671 6.05947 7.01109 5.37336 11.0199 4.00113L11.7836 3.73971C13.8733 3.0244 14.9181 2.66675 16 2.66675C17.0819 2.66675 18.1267 3.0244 20.2164 3.73971L20.9801 4.00113C24.9889 5.37336 26.9933 6.05947 27.4967 6.77663C28 7.49379 28 9.62551 28 13.889C28 14.5329 28 15.2313 28 15.9886C28 23.5059 22.348 27.1541 18.8019 28.7031C17.84 29.1233 17.3591 29.3334 16 29.3334C14.6409 29.3334 14.16 29.1233 13.1981 28.7031C9.65195 27.1541 4 23.5059 4 15.9886C4 15.2313 4 14.5329 4 13.889Z"
          stroke={strokeColor}
          stroke-width="2"
        />
        <path
          d="M15.3333 21.3334H16.6667C17.4031 21.3334 18 20.7365 18 20.0001V18.1317C19.1956 17.4399 20 16.1473 20 14.6667C20 12.4576 18.2092 10.6667 16 10.6667C13.7908 10.6667 12 12.4576 12 14.6667C12 16.1473 12.8044 17.4399 14 18.1317V20.0001C14 20.7365 14.5969 21.3334 15.3333 21.3334Z"
          stroke={strokeColor}
          stroke-width="2"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

const Reload = ({ fill }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.9999C0.999154 13.9691 1.52692 15.9024 2.52821 17.598C3.5295 19.2936 4.96759 20.6893 6.69237 21.6394C8.41714 22.5896 10.3653 23.0593 12.3336 22.9996C14.3019 22.9399 16.218 22.3529 17.882 21.2999L19.293 22.7099C19.433 22.8499 19.6115 22.9452 19.8057 22.9836C19.9999 23.0221 20.2012 23.0021 20.384 22.926C20.5669 22.85 20.723 22.7214 20.8327 22.5565C20.9423 22.3916 21.0006 22.1979 21 21.9999V17.9999C21 17.7347 20.8946 17.4803 20.7071 17.2928C20.5196 17.1053 20.2652 16.9999 20 16.9999H16C15.8023 17 15.609 17.0586 15.4445 17.1685C15.2801 17.2784 15.152 17.4346 15.0763 17.6173C15.0007 17.8 14.9809 18.001 15.0194 18.1949C15.058 18.3889 15.1532 18.5671 15.293 18.7069L16.421 19.8349C15.0522 20.6089 13.5045 21.0105 11.932 20.9997C10.3596 20.9888 8.81754 20.5659 7.45956 19.7732C6.10158 18.9804 4.97517 17.8455 4.19268 16.4815C3.41019 15.1176 2.99896 13.5724 3 11.9999C3 11.7347 2.89464 11.4803 2.70711 11.2928C2.51957 11.1053 2.26522 10.9999 2 10.9999C1.73478 10.9999 1.48043 11.1053 1.29289 11.2928C1.10536 11.4803 1 11.7347 1 11.9999ZM22 12.9999C21.7348 12.9999 21.4804 12.8946 21.2929 12.707C21.1054 12.5195 21 12.2651 21 11.9999C20.9974 9.61377 20.0483 7.32613 18.361 5.63887C16.6738 3.95162 14.3861 3.00256 12 2.99991C10.4503 2.99713 8.92669 3.39905 7.58 4.16591L8.707 5.29291C8.84681 5.43276 8.94202 5.61092 8.98058 5.80488C9.01915 5.99883 8.99935 6.19986 8.92368 6.38256C8.84801 6.56526 8.71987 6.72143 8.55546 6.83131C8.39105 6.9412 8.19775 6.99987 8 6.99991H4C3.73478 6.99991 3.48043 6.89455 3.29289 6.70702C3.10536 6.51948 3 6.26513 3 5.99991V1.99991C2.99995 1.80214 3.05854 1.6088 3.16837 1.44434C3.27819 1.27987 3.43432 1.15166 3.617 1.07591C3.73833 1.02532 3.86855 0.999485 4 0.99991C4.2652 0.999966 4.51951 1.10536 4.707 1.29291L6.118 2.69991C7.87577 1.58244 9.91711 0.992451 12 0.99991C14.9163 1.00335 17.7122 2.16338 19.7744 4.22554C21.8365 6.28769 22.9966 9.08358 23 11.9999C23 12.2651 22.8946 12.5195 22.7071 12.707C22.5196 12.8946 22.2652 12.9999 22 12.9999Z"
        fill={fill}
      />
    </svg>
  );
};

const Eye = ({ fill }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 12C15 13.6569 13.6569 15 12 15C10.3432 15 9 13.6569 9 12C9 10.3431 10.3432 9 12 9C13.6569 9 15 10.3431 15 12Z"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const Play = ({ fill }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
        stroke={fill}
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const Back = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 12H10M10 12L13 15M10 12L13 9"
        className="stroke-black dark:stroke-white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 16V12V8"
        className="stroke-black dark:stroke-white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        opacity="0.5"
        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
        className="stroke-black dark:stroke-white"
        stroke-width="1.5"
      />
    </svg>
  );
};
const User = ({ color, selectedTab, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 5C7.10457 5 8 4.10457 8 3C8 1.89543 7.10457 1 6 1C4.89543 1 4 1.89543 4 3C4 4.10457 4.89543 5 6 5Z"
        stroke={selectedTab == "SF" ? "#ffc61a" : color}
      />
      <path
        d="M10 8.75C10 9.99265 10 11 6 11C2 11 2 9.99265 2 8.75C2 7.50735 3.79086 6.5 6 6.5C8.20915 6.5 10 7.50735 10 8.75Z"
        stroke={selectedTab == "SF" ? "#ffc61a" : color}
      />
    </svg>
  );
};

const Pencil = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 22C14.1144 22 13.1716 22 12.5858 21.4142C12 20.8284 12 19.8856 12 18V6C12 4.11438 12 3.17157 12.5858 2.58579C13.1716 2 14.1144 2 16 2H18C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22H16Z"
        stroke="black"
        stroke-width="1.5"
      />
      <path
        opacity="0.5"
        d="M12 12H14M12 6H14M12 18H14M12 15H15M12 9H15"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M6.01206 21.0271L5.72361 21.5751C5.58657 21.8355 5.30643 22 5 22C4.69357 22 4.41343 21.8355 4.27639 21.5751L3.98794 21.0271M6.01206 21.0271H3.98794M6.01206 21.0271L7.19209 18.785C7.47057 18.2559 7.60981 17.9914 7.71267 17.7157C7.834 17.3905 7.91768 17.0538 7.96223 16.7114C8 16.4211 8 16.1254 8 15.5338V5.8V4.85C8 3.27599 6.65685 2 5 2C3.34315 2 2 3.27599 2 4.85V5.8V15.5338C2 16.1254 2 16.4211 2.03777 16.7114C2.08232 17.0538 2.166 17.3905 2.28733 17.7157C2.39019 17.9914 2.52943 18.2559 2.8079 18.785L3.98794 21.0271"
        stroke="black"
        stroke-width="1.5"
      />
      <path
        opacity="0.5"
        d="M2 5.7998C2 5.7998 3.125 6.7498 5 6.7498C6.875 6.7498 8 5.7998 8 5.7998"
        stroke="black"
        stroke-width="1.5"
      />
    </svg>
  );
};

const Flip = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.35">
        <path
          d="M2 18.1138V5.88665C2 4.1845 2 3.33343 2.54242 3.05429C3.08484 2.77515 3.77738 3.26984 5.16247 4.25918L6.74371 5.38864C7.35957 5.82854 7.6675 6.04849 7.83375 6.37154C8 6.69459 8 7.07301 8 7.82984V16.1707C8 16.9275 8 17.3059 7.83375 17.629C7.6675 17.952 7.35957 18.172 6.74372 18.6119L5.16248 19.7413C3.77738 20.7307 3.08484 21.2253 2.54242 20.9462C2 20.6671 2 19.816 2 18.1138Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M22 18.1138V5.88665C22 4.1845 22 3.33343 21.4576 3.05429C20.9152 2.77515 20.2226 3.26984 18.8375 4.25918L17.2563 5.38864C16.6404 5.82854 16.3325 6.04849 16.1662 6.37154C16 6.69459 16 7.07301 16 7.82984V16.1707C16 16.9275 16 17.3059 16.1662 17.629C16.3325 17.952 16.6404 18.172 17.2563 18.6119L18.8375 19.7413C20.2226 20.7307 20.9152 21.2253 21.4576 20.9462C22 20.6671 22 19.816 22 18.1138Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          opacity="0.5"
          d="M12 14V10"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          opacity="0.5"
          d="M12 6V2"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          opacity="0.5"
          d="M12 22V18"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

const Medicine = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.35">
        <path
          opacity="0.5"
          d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M12 6V8M12 8V10M12 8H10M12 8H14"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M7.99805 14H15.998"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M9 18H15"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

const Scan = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.35">
        <path
          d="M5.50195 15.5C5.50195 14.5572 5.50195 14.0858 5.79484 13.7929C6.08774 13.5 6.55914 13.5 7.50195 13.5H8.50195C9.44476 13.5 9.91616 13.5 10.2091 13.7929C10.502 14.0858 10.502 14.5572 10.502 15.5V16.5C10.502 17.4428 10.502 17.9142 10.2091 18.2071C9.91616 18.5 9.44476 18.5 8.50195 18.5C7.08774 18.5 6.38063 18.5 5.94129 18.0607C5.50195 17.6213 5.50195 16.9142 5.50195 15.5Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M5.50195 8.5C5.50195 7.08579 5.50195 6.37868 5.94129 5.93934C6.38063 5.5 7.08774 5.5 8.50195 5.5C9.44476 5.5 9.91616 5.5 10.2091 5.79289C10.502 6.08579 10.502 6.55719 10.502 7.5V8.5C10.502 9.44281 10.502 9.91421 10.2091 10.2071C9.91616 10.5 9.44476 10.5 8.50195 10.5H7.50195C6.55914 10.5 6.08774 10.5 5.79484 10.2071C5.50195 9.91421 5.50195 9.44281 5.50195 8.5Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M13.5 15.5C13.5 14.5572 13.5 14.0858 13.7929 13.7929C14.0858 13.5 14.5572 13.5 15.5 13.5H16.5C17.4428 13.5 17.9142 13.5 18.2071 13.7929C18.5 14.0858 18.5 14.5572 18.5 15.5C18.5 16.9142 18.5 17.6213 18.0607 18.0607C17.6213 18.5 16.9142 18.5 15.5 18.5C14.5572 18.5 14.0858 18.5 13.7929 18.2071C13.5 17.9142 13.5 17.4428 13.5 16.5V15.5Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M13.5 7.5C13.5 6.55719 13.5 6.08579 13.7929 5.79289C14.0858 5.5 14.5572 5.5 15.5 5.5C16.9142 5.5 17.6213 5.5 18.0607 5.93934C18.5 6.37868 18.5 7.08579 18.5 8.5C18.5 9.44281 18.5 9.91421 18.2071 10.2071C17.9142 10.5 17.4428 10.5 16.5 10.5H15.5C14.5572 10.5 14.0858 10.5 13.7929 10.2071C13.5 9.91421 13.5 9.44281 13.5 8.5V7.5Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          opacity="0.5"
          d="M22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          opacity="0.5"
          d="M10 22C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          opacity="0.5"
          d="M10 2C6.22876 2 4.34315 2 3.17157 3.17157C2 4.34315 2 6.22876 2 10"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          opacity="0.5"
          d="M14 2C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

const Add = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.35">
        <path
          opacity="0.5"
          d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M15 13H12M12 13H9M12 13V10M12 13V16"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

const Calendar = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.35">
        <path
          opacity="0.5"
          d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M15 13H12M12 13H9M12 13V10M12 13V16"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

const EditNode = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_167_1289)">
        <path
          d="M10.1909 2.10111L9.57307 2.71903L3.89222 8.39985C3.50745 8.78465 3.31506 8.97699 3.14961 9.18912C2.95443 9.43939 2.7871 9.71012 2.65057 9.99659C2.53483 10.2395 2.44879 10.4976 2.27671 11.0138L1.54755 13.2013L1.36931 13.7361C1.28463 13.9901 1.35074 14.2701 1.54009 14.4595C1.72945 14.6489 2.00953 14.715 2.26357 14.6303L2.79829 14.4521L4.98579 13.7229C5.50202 13.5508 5.76014 13.4648 6.00299 13.3491C6.28947 13.2125 6.56022 13.0452 6.81047 12.85C7.02261 12.6845 7.21494 12.4921 7.59974 12.1074L13.2805 6.42654L13.8985 5.80863C14.9223 4.78482 14.9223 3.12491 13.8985 2.10111C12.8747 1.0773 11.2147 1.0773 10.1909 2.10111Z"
          stroke="black"
        />
        <path
          opacity="0.5"
          d="M9.57333 2.71875C9.57333 2.71875 9.6506 4.03183 10.8092 5.19043C11.9678 6.34903 13.2809 6.42627 13.2809 6.42627M2.79859 14.4518L1.54785 13.201"
          stroke="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_167_1289">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Cut = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_167_1295)">
        <path
          opacity="0.5"
          d="M5.0658 13.6666L12 1.33325M1.33333 12.6666C1.33333 13.7712 2.22873 14.6666 3.33333 14.6666C4.43793 14.6666 5.33333 13.7712 5.33333 12.6666C5.33333 11.562 4.43793 10.6666 3.33333 10.6666C2.22873 10.6666 1.33333 11.562 1.33333 12.6666Z"
          stroke="black"
          stroke-linecap="round"
        />
        <path
          d="M10.9346 13.6666L4.00033 1.33325M14.667 12.6666C14.667 13.7712 13.7716 14.6666 12.667 14.6666C11.5624 14.6666 10.667 13.7712 10.667 12.6666C10.667 11.562 11.5624 10.6666 12.667 10.6666C13.7716 10.6666 14.667 11.562 14.667 12.6666Z"
          stroke="black"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_167_1295">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="matrix(-1 0 0 1 16 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const Copy = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7.33325C4 5.44763 4 4.50483 4.58579 3.91904C5.17157 3.33325 6.11438 3.33325 8 3.33325H10C11.8856 3.33325 12.8284 3.33325 13.4142 3.91904C14 4.50483 14 5.44763 14 7.33325V10.6666C14 12.5522 14 13.495 13.4142 14.0808C12.8284 14.6666 11.8856 14.6666 10 14.6666H8C6.11438 14.6666 5.17157 14.6666 4.58579 14.0808C4 13.495 4 12.5522 4 10.6666V7.33325Z"
        stroke="black"
      />
      <path
        opacity="0.5"
        d="M4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666V6.66658C2 4.15243 2 2.89535 2.78105 2.1143C3.5621 1.33325 4.81917 1.33325 7.33333 1.33325H10C11.1046 1.33325 12 2.22869 12 3.33325"
        stroke="black"
      />
    </svg>
  );
};

const Paste = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M10.6667 2.66797C12.1167 2.67604 12.9019 2.74034 13.4142 3.2526C14 3.83838 14 4.7812 14 6.6668V10.6668C14 12.5524 14 13.4953 13.4142 14.081C12.8284 14.6668 11.8856 14.6668 10 14.6668H6C4.11438 14.6668 3.17157 14.6668 2.58579 14.081C2 13.4953 2 12.5524 2 10.6668V6.6668C2 4.7812 2 3.83838 2.58579 3.2526C3.09804 2.74034 3.88331 2.67604 5.33333 2.66797"
        stroke="black"
      />
      <path
        d="M4.66602 9.66675H9.99935"
        stroke="black"
        stroke-linecap="round"
      />
      <path
        opacity="0.5"
        d="M4.66602 12H8.33268"
        stroke="black"
        stroke-linecap="round"
      />
      <path
        d="M5.33398 2.33325C5.33398 1.78097 5.7817 1.33325 6.33398 1.33325H9.66732C10.2196 1.33325 10.6673 1.78097 10.6673 2.33325V2.99992C10.6673 3.55221 10.2196 3.99992 9.66732 3.99992H6.33398C5.7817 3.99992 5.33398 3.55221 5.33398 2.99992V2.33325Z"
        stroke="black"
      />
    </svg>
  );
};

const Delete = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.02211 5.92661C1.70175 3.79089 1.54157 2.72303 2.14 2.02814C2.73843 1.33325 3.81824 1.33325 5.97786 1.33325H10.0217C12.1813 1.33325 13.2611 1.33325 13.8596 2.02814C14.458 2.72303 14.2978 3.79089 13.9774 5.92661L13.1774 11.2599C12.9337 12.885 12.8118 13.6975 12.2492 14.1821C11.6866 14.6666 10.8649 14.6666 9.2217 14.6666H6.77784C5.13461 14.6666 4.31298 14.6666 3.75037 14.1821C3.18775 13.6975 3.06587 12.885 2.82211 11.2599L2.02211 5.92661Z"
        stroke="#F44336"
      />
      <path d="M14 4H2" stroke="#F44336" stroke-linecap="round" />
      <path
        opacity="0.5"
        d="M5.33301 4L2.33301 7.33333L7.33301 12.6667M9.33301 4L2.66634 10.6667M13.333 4L4.66634 12.6667M8.66634 12.6667L13.6663 7.33333L10.6663 4M6.66634 4L13.333 10.6667M2.66634 4L11.333 12.6667"
        stroke="#F44336"
        stroke-linejoin="round"
      />
      <path
        d="M12.6663 12.6667H3.33301"
        stroke="#F44336"
        stroke-linecap="round"
      />
    </svg>
  );
};

export {
  Data,
  Wire,
  Connect,
  Sheild,
  Reload,
  Eye,
  Play,
  Back,
  User,
  Pencil,
  Flip,
  Medicine,
  Scan,
  Add,
  Calendar,
  EditNode,
  Cut,
  Copy,
  Paste,
  Delete,
};
