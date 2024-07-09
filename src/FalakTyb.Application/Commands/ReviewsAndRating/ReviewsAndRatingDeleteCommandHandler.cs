
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ReviewsAndRatingDeleteCommandHandler : IRequestHandler<ReviewsAndRatingDeleteCommand, Unit>
    {
        private IReviewsAndRatingRepository _reviewsAndRatingRepository;

        public ReviewsAndRatingDeleteCommandHandler(
            IReviewsAndRatingRepository reviewsAndRatingRepository)
        {
            _reviewsAndRatingRepository = reviewsAndRatingRepository;
        }

        public async Task<Unit> Handle(ReviewsAndRatingDeleteCommand command, CancellationToken cancellationToken)
        {
            await _reviewsAndRatingRepository.DeleteByIdAsync(command.Id);
            await _reviewsAndRatingRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
