
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ReviewsAndRatingCreateCommandHandler : IRequestHandler<ReviewsAndRatingCreateCommand, ReviewsAndRating>
    {
        private IReviewsAndRatingRepository _reviewsAndRatingRepository;

        public ReviewsAndRatingCreateCommandHandler(
            IReviewsAndRatingRepository reviewsAndRatingRepository)
        {
            _reviewsAndRatingRepository = reviewsAndRatingRepository;
        }

        public async Task<ReviewsAndRating> Handle(ReviewsAndRatingCreateCommand command, CancellationToken cancellationToken)
        {

            
            var entity = await _reviewsAndRatingRepository.CreateOrUpdateAsync(command.ReviewsAndRating);
            await _reviewsAndRatingRepository.SaveChangesAsync();
            return entity;
        }
    }
}
