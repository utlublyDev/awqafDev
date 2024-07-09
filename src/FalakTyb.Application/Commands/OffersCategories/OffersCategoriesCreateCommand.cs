
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class OffersCategoriesCreateCommand : IRequest<OffersCategories>
    {
        public OffersCategories OffersCategories { get; set; }
    }
}
