import Spinner from '@/src/components/spinner';
import { DayType, GetCardsDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import React from 'react'

type Props = {
	day: string
}

const Cards = ({day}: Props) => {

	const {
    data: cards,
    loading: cardsLoading,
    error: cardsError,
  } = useQuery(GetCardsDocument, {
    variables: {
      day: day as DayType,
    },
  });

	return (
		<>
		{cardsLoading ? (
          <Spinner intent={'secondary'} className='mt-10' />
        ) : cards?.getCards.__typename === "QueryGetCardsSuccess" ? (
          <>
            <div className="max-w-6xl flex flex-wrap gap-8 justify-center text-white/90 ">
              { cards.getCards.data.length > 0 ? cards.getCards.data.map((card, index) => (
                <div
                  key={index}
                  className="md:basis-[45%] min-w-[300px] basis-full bg-black/20  flex flex-col shadow-sm rounded-md">
                  <h2 className="mb-2 text-xl titleFont md:px-6 md:pt-6 px-4 pt-4">
                    Clue {index + 1}
                  </h2>
                  <h2 className="mb-3 bodyFont md:px-6  px-4 ">{card.clue}</h2>
                  <div className="md:px-6 md:pb-4 flex flex-col grow">
                    {/* <ImageUpload
                      loading={submissionsLoading}
                      existingImage={
                        submissions?.submissionsByUser.__typename ===
                        "QuerySubmissionsByUserSuccess"
                          ? submissions?.submissionsByUser.data.filter(
                              (submission) => submission.cardId === card.id
                            )[0]?.image
                          : null
                      }
                      setImage={(file) => {
                        setSaved(false);
                        setImageFiles((prev) => {
                          const newFiles = [...prev];
                          newFiles[index] = file;
                          return newFiles;
                        });
                      }}
                    /> */}
                  </div>
                </div>
              )) : <span className='mt-10 text-white/70'>No cards found</span>}
            </div>
          </>
        ) : (
          <span className="text-white/70">Error: Could not fetch cards, please try again later</span>
        )}</>
	)
}

export default Cards