
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class OffersUpdateCommand : IRequest<Offers>
    {
        public Offers Offers { get; set; }
    }
}
