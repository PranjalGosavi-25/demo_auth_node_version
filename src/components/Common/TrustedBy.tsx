import { TRUSTED_BY } from '@constants/layout';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

function TrustedBy(props: { bgColor?: string }) {
  const { bgColor = 'bg-black' } = props;
  return (
    <div className={bgColor}>
      <div className="flex items-center gap-0 sm:gap-8 container container-x-padding">
        <section>
          <p className="text-primary-light-gradient text-sm lg:text-lg font-medium pr-0 lg:pr-6">
            TRUSTED BY <br className="" />{' '}
            <span className="whitespace-nowrap"> 100+ COMPANIES</span>
          </p>
        </section>
        <div className="w-full overflow-hidden">
          <Marquee speed={30} autoFill>
            {TRUSTED_BY.map((item, key) => (
              <div key={key} className="px-8 md:px-6">
                <Image
                  src={item.image}
                  height={40}
                  width={120}
                  alt={item.alt}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default TrustedBy;
